import { useRef, useCallback, useEffect } from 'react';

// Scheduler tick rate: 40 Hz (every 25ms)
const SCHEDULER_INTERVAL = 25; // ms

// Lookahead window: schedule events this far in advance
const LOOKAHEAD_TIME = 0.1; // 100ms in seconds

/**
 * Game loop-based scheduler engine with fixed timestep and lookahead
 */
export function useSchedulerEngine({
  getCurrentTime,
  getStepDuration,
  totalSteps,
  onScheduleStep,
  updateStepTracking,
}) {
  const isSchedulingRef = useRef(false);
  const schedulerTimerRef = useRef(null);
  const lastTickTimeRef = useRef(0);
  const accumulatorRef = useRef(0);
  const currentStepRef = useRef(-1);
  const nextNoteTimeRef = useRef(0);

  // Store functions in refs to avoid dependency issues
  const getCurrentTimeRef = useRef(getCurrentTime);
  const getStepDurationRef = useRef(getStepDuration);
  const onScheduleStepRef = useRef(onScheduleStep);
  const updateStepTrackingRef = useRef(updateStepTracking);
  const totalStepsRef = useRef(totalSteps);

  // Keep refs in sync
  useEffect(() => {
    getCurrentTimeRef.current = getCurrentTime;
    getStepDurationRef.current = getStepDuration;
    onScheduleStepRef.current = onScheduleStep;
    updateStepTrackingRef.current = updateStepTracking;
    totalStepsRef.current = totalSteps;
  });

  /**
   * Fixed timestep scheduler tick
   */
  const schedulerTick = useCallback(() => {
    if (!isSchedulingRef.current) return;

    const currentTime = getCurrentTimeRef.current();
    const stepDuration = getStepDurationRef.current();

    // Pattern #1: Delta time tracking
    if (lastTickTimeRef.current === 0) {
      lastTickTimeRef.current = currentTime;
    }

    const deltaTime = currentTime - lastTickTimeRef.current;
    lastTickTimeRef.current = currentTime;

    // Pattern #2: Fixed timestep with accumulator
    accumulatorRef.current += deltaTime;

    // Schedule all notes that fall within the lookahead window
    let scheduledCount = 0;
    while (nextNoteTimeRef.current < currentTime + LOOKAHEAD_TIME) {
      // Advance to next step
      currentStepRef.current = (currentStepRef.current + 1) % totalStepsRef.current;
      scheduledCount++;

      // Schedule this step's notes
      if (onScheduleStepRef.current) {
        onScheduleStepRef.current(currentStepRef.current, nextNoteTimeRef.current);
      }

      // Update next note time (fixed timestep)
      nextNoteTimeRef.current += stepDuration;

      // Update timing clock's internal state
      if (updateStepTrackingRef.current) {
        updateStepTrackingRef.current(currentStepRef.current, accumulatorRef.current);
      }

      // Consume from accumulator
      if (accumulatorRef.current >= stepDuration) {
        accumulatorRef.current -= stepDuration;
      }
    }
  }, []);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      if (schedulerTimerRef.current) {
        clearInterval(schedulerTimerRef.current);
        schedulerTimerRef.current = null;
      }
    };
  }, []); // Empty deps - only run on mount/unmount

  /**
   * Start the scheduler
   */
  const start = useCallback(() => {
    if (isSchedulingRef.current) {
      return;
    }

    const currentTime = getCurrentTimeRef.current();

    // Initialize timing state
    isSchedulingRef.current = true;
    lastTickTimeRef.current = currentTime;
    accumulatorRef.current = 0;
    currentStepRef.current = -1;
    nextNoteTimeRef.current = currentTime;

    // Set up interval
    schedulerTimerRef.current = setInterval(schedulerTick, SCHEDULER_INTERVAL);

    // Run first tick immediately
    schedulerTick();
  }, [schedulerTick]);

  /**
   * Stop the scheduler
   */
  const stop = useCallback(() => {
    isSchedulingRef.current = false;
    lastTickTimeRef.current = 0;
    accumulatorRef.current = 0;
    currentStepRef.current = -1;
    nextNoteTimeRef.current = 0;

    if (schedulerTimerRef.current) {
      clearInterval(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
  }, []);

  /**
   * Restart the scheduler from the beginning
   */
  const restart = useCallback(() => {
    stop();
    start();
  }, [start, stop]);

  /**
   * Get current scheduler position
   */
  const getPosition = useCallback(() => {
    return {
      currentStep: currentStepRef.current,
      nextNoteTime: nextNoteTimeRef.current,
      accumulator: accumulatorRef.current,
    };
  }, []);

  return {
    start,
    stop,
    restart,
    getPosition,
    isScheduling: isSchedulingRef.current,
  };
}
