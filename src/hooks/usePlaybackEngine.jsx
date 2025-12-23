import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useTimingClock } from './useTimingClock';
import { useSchedulerEngine } from './useSchedulerEngine';
import { useMidiPlayer } from './useMidiPlayer';

/**
 * Manages playback timing and MIDI note triggering using game loop patterns
 *
 * Uses three-layer architecture:
 * - useTimingClock: Web Audio clock for high-precision timing
 * - useSchedulerEngine: Fixed timestep scheduler with lookahead
 * - useMidiPlayer: Timestamp-based MIDI event player
 *
 * @param {Object} params
 * @param {Array} params.sequence - Current sequence to play
 * @param {number} params.bpm - Beats per minute
 * @param {Function} params.scheduleNoteFn - Function to schedule MIDI notes
 * @param {Function} params.getMidiParams - Function to get MIDI params for a track index
 * @param {number} params.division - Note division (1=quarter, 2=eighth, 4=sixteenth)
 * @param {number} params.totalSteps - Total number of steps in the pattern
 */
export function usePlaybackEngine({ sequence, bpm, scheduleNoteFn, getMidiParams, division, totalSteps }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const scheduleNoteFnRef = useRef(scheduleNoteFn);
  const sequenceRef = useRef(sequence);

  // Layer 1: High-precision timing clock
  const timingClock = useTimingClock({ bpm, division, totalSteps });

  // Store getCurrentTime in ref to avoid recreating midiPlayer
  const getCurrentTimeRef = useRef(timingClock.getCurrentTime);
  useEffect(() => {
    getCurrentTimeRef.current = timingClock.getCurrentTime;
  }, [timingClock]);

  // Layer 3: MIDI player with event queue (memoized to prevent recreation)
  const midiPlayer = useMemo(() => {
    // Closure-scoped state (not global) - lives as long as this memoized object
    let eventQueue = [];
    let isActive = false;
    let animationFrameId = null;

    return {
      scheduleNote: (timestamp, channel, note, velocity, duration) => {
        const event = { timestamp, channel, note, velocity, duration };
        eventQueue.push(event);
      },
      start: () => {
        if (isActive) return;

        isActive = true;
        eventQueue = [];

        const playerTick = () => {
          if (!isActive) return;

          const now = getCurrentTimeRef.current();

          // Fire ready events
          const readyEvents = eventQueue.filter(e => e.timestamp <= now);
          readyEvents.forEach(event => {
            if (scheduleNoteFnRef.current) {
              scheduleNoteFnRef.current(event.channel, event.note, event.velocity, event.duration);
            }
          });

          // Remove fired events
          eventQueue = eventQueue.filter(e => e.timestamp > now);

          if (isActive) {
            animationFrameId = requestAnimationFrame(playerTick);
          }
        };

        animationFrameId = requestAnimationFrame(playerTick);
      },
      stop: () => {
        isActive = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      clearScheduledEvents: () => {
        eventQueue = [];
      },
    };
  }, []); // Empty deps - midiPlayer created once, uses getCurrentTimeRef.current

  // Callback when scheduler wants to schedule a step
  const handleScheduleStep = useCallback((step, timestamp) => {
    const currentSequence = sequenceRef.current;

    // Schedule all active notes in this step
    currentSequence.forEach((track, trackIndex) => {
      if (track[step]) {
        const midiParams = getMidiParams(trackIndex);
        if (midiParams) {
          midiPlayer.scheduleNote(
            timestamp,
            midiParams.channel,
            midiParams.note,
            midiParams.velocity,
            midiParams.duration
          );
        }
      }
    });

    // Update visual current step
    setCurrentStep(step);
  }, [midiPlayer, getMidiParams]);

  // Layer 2: Scheduler engine with fixed timestep
  const scheduler = useSchedulerEngine({
    getCurrentTime: timingClock.getCurrentTime,
    getStepDuration: timingClock.getStepDuration,
    totalSteps,
    onScheduleStep: handleScheduleStep,
    updateStepTracking: timingClock.updateStepTracking,
  });

  // Keep refs in sync
  useEffect(() => {
    scheduleNoteFnRef.current = scheduleNoteFn;
  }, [scheduleNoteFn]);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  // Start playback
  const start = useCallback(async () => {
    if (isPlaying) {
      return;
    }

    // CRITICAL: Resume AudioContext on user gesture (click)
    if (timingClock.audioContext && timingClock.audioContext.state === 'suspended') {
      await timingClock.audioContext.resume();
    }

    setIsPlaying(true);
    setCurrentStep(-1);

    // Start all three layers
    timingClock.start();
    timingClock.setPlaying(true);

    midiPlayer.clearScheduledEvents();
    midiPlayer.start();

    scheduler.start();
  }, [isPlaying, timingClock, midiPlayer, scheduler]);

  // Stop playback
  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(-1);

    // Stop all three layers
    scheduler.stop();
    midiPlayer.stop();
    midiPlayer.clearScheduledEvents();
    timingClock.stop();
    timingClock.setPlaying(false);
  }, [scheduler, midiPlayer, timingClock]);

  // Restart playback from beginning
  const restart = useCallback(() => {
    const wasPlaying = isPlaying;

    // Stop everything
    scheduler.stop();
    midiPlayer.stop();
    midiPlayer.clearScheduledEvents();
    timingClock.stop();
    timingClock.setPlaying(false);

    // Reset timing
    setCurrentStep(-1);
    timingClock.reset();

    // Restart if we were playing
    if (wasPlaying) {
      setIsPlaying(true);
      timingClock.start();
      timingClock.setPlaying(true);
      midiPlayer.start();
      scheduler.start();
    }
  }, [isPlaying, scheduler, midiPlayer, timingClock]);

  /**
   * Get musical position for visual components
   * @returns {{currentStep: number, progress: number}}
   */
  const getMusicalPosition = useCallback(() => {
    return timingClock.getMusicalPosition();
  }, [timingClock]);

  return {
    isPlaying,
    currentStep,
    start,
    stop,
    restart,
    getMusicalPosition,
  };
}
