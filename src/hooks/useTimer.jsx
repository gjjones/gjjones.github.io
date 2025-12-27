/**
 * Timer Hook
 *
 * Tracks elapsed time for quiz sessions.
 * Provides start, stop, reset functionality and formatted time display.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for tracking elapsed time
 * @returns {Object} Timer state and controls
 */
export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  /**
   * Start the timer
   */
  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - (elapsedSeconds * 1000);
      setIsRunning(true);
    }
  }, [isRunning, elapsedSeconds]);

  /**
   * Stop the timer
   */
  const stop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isRunning]);

  /**
   * Reset the timer to zero
   */
  const reset = useCallback(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
    startTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Update elapsed time while running
   */
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeRef.current) / 1000);
        setElapsedSeconds(elapsed);
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning]);

  /**
   * Format seconds into MM:SS format
   * @param {number} seconds - Total seconds
   * @returns {string} Formatted time string
   */
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    // State
    isRunning,
    elapsedSeconds,
    formattedTime: formatTime(elapsedSeconds),

    // Controls
    start,
    stop,
    reset,

    // Utilities
    formatTime
  };
}

export default useTimer;
