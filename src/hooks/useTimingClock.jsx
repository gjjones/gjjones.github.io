import { useRef, useCallback, useEffect } from 'react';

// Singleton Web Audio context for high-precision timing
let audioContextInstance = null;

/**
 * Gets or creates the singleton Web Audio context
 * Used solely for high-precision timing, not audio synthesis
 * @throws {Error} If Web Audio API is not supported
 */
function getAudioContext() {
  if (!audioContextInstance) {
    // Check for Web Audio API support
    if (!window.AudioContext && !window.webkitAudioContext) {
      throw new Error(
        'Web Audio API is not supported in this browser. ' +
        'Please use a modern browser like Chrome, Firefox, or Edge for accurate timing.'
      );
    }

    try {
      audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      throw new Error(
        'Failed to create AudioContext: ' + error.message + '. ' +
        'This may occur in older browsers or restricted environments.'
      );
    }
  }
  return audioContextInstance;
}

/**
 * Closes the shared AudioContext singleton and releases resources
 * Call this only when completely done with all timing operations
 * (e.g., app-level cleanup, before navigating away)
 *
 * Note: This is typically not needed during normal component unmount,
 * as the singleton is designed to persist across component lifecycles.
 */
export function closeTimingClock() {
  if (audioContextInstance && audioContextInstance.state !== 'closed') {
    audioContextInstance.close();
    audioContextInstance = null;
  }
}

/**
 * Provides high-precision timing using Web Audio clock
 *
 * Web Audio's AudioContext.currentTime provides:
 * - Microsecond precision (vs 1ms for Date.now())
 * - Monotonic clock (never jumps backward)
 * - Separate thread (unaffected by main thread blocking or tab throttling)
 * - Industry standard for web-based music applications
 *
 * @param {Object} params
 * @param {number} params.bpm - Beats per minute
 * @param {number} params.division - Note division (1=quarter, 2=eighth, 4=sixteenth)
 * @param {number} params.totalSteps - Total steps in the pattern
 */
export function useTimingClock({ bpm, division, totalSteps }) {
  const audioContextRef = useRef(null);
  const playbackStartTimeRef = useRef(null);
  const currentStepRef = useRef(-1);
  const accumulatorRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Initialize audio context
  useEffect(() => {
    try {
      audioContextRef.current = getAudioContext();

      // Resume context if suspended (can happen after page load or sleep)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (error) {
      console.error('[TimingClock] Initialization failed:', error.message);
      // The app will not function without Web Audio API
      // Consider showing an error UI to the user in production
    }

    // Handle visibility changes (resume context when tab becomes visible)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  /**
   * Get current high-resolution time from Web Audio clock
   * @returns {number} Current time in seconds with microsecond precision
   */
  const getCurrentTime = useCallback(() => {
    return audioContextRef.current ? audioContextRef.current.currentTime : 0;
  }, []);

  /**
   * Calculate step duration in seconds based on BPM and division
   * @returns {number} Duration of one step in seconds
   */
  const getStepDuration = useCallback(() => {
    // Convert BPM to seconds per quarter note, then divide by note division
    // division: 1 = quarter notes, 2 = eighth notes, 4 = sixteenth notes
    return (60 / bpm) / division;
  }, [bpm, division]);

  /**
   * Start the timing clock
   */
  const start = useCallback(() => {
    playbackStartTimeRef.current = getCurrentTime();
    currentStepRef.current = -1;
    accumulatorRef.current = 0;
    isPlayingRef.current = true;
  }, [getCurrentTime]);

  /**
   * Stop the timing clock
   */
  const stop = useCallback(() => {
    playbackStartTimeRef.current = null;
    currentStepRef.current = -1;
    accumulatorRef.current = 0;
    isPlayingRef.current = false;
  }, []);

  /**
   * Reset the clock to the beginning without stopping
   */
  const reset = useCallback(() => {
    playbackStartTimeRef.current = getCurrentTime();
    currentStepRef.current = -1;
    accumulatorRef.current = 0;
  }, [getCurrentTime]);

  /**
   * Get musical position based on elapsed time
   * @returns {{currentStep: number, progress: number, elapsedTime: number}}
   */
  const getMusicalPosition = useCallback(() => {
    if (!isPlayingRef.current || playbackStartTimeRef.current === null) {
      return {
        currentStep: currentStepRef.current,
        progress: 0,
        elapsedTime: 0,
      };
    }

    const now = getCurrentTime();
    const elapsedTime = now - playbackStartTimeRef.current;
    const stepDuration = getStepDuration();

    // Calculate which step we should be on based on elapsed time
    const totalElapsedSteps = elapsedTime / stepDuration;
    const currentStep = Math.floor(totalElapsedSteps) % totalSteps;
    const progress = totalElapsedSteps % 1; // Fractional progress within current step

    return {
      currentStep,
      progress,
      elapsedTime,
    };
  }, [getCurrentTime, getStepDuration, totalSteps]);

  /**
   * Update internal step tracking (called by scheduler)
   * @param {number} step - New current step
   * @param {number} accumulator - Current accumulator value
   */
  const updateStepTracking = useCallback((step, accumulator) => {
    currentStepRef.current = step;
    accumulatorRef.current = accumulator;
  }, []);

  /**
   * Update playing state (called by scheduler)
   * @param {boolean} playing - Whether playback is active
   */
  const setPlaying = useCallback((playing) => {
    isPlayingRef.current = playing;
  }, []);

  return {
    getCurrentTime,
    getStepDuration,
    getMusicalPosition,
    start,
    stop,
    reset,
    updateStepTracking,
    setPlaying,
    audioContext: audioContextRef.current,
  };
}
