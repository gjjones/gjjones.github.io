import { useRef, useCallback, useEffect } from 'react';

/**
 * MIDI player with timestamp-based event scheduling
 *
 * Separates MIDI event scheduling from playback (game loop pattern #3).
 * Events are scheduled with precise timestamps, then fired when their time arrives.
 * Runs at 60fps via requestAnimationFrame for smooth, accurate playback.
 *
 * @param {Object} params
 * @param {Function} params.getCurrentTime - High-res clock reference
 * @param {Function} params.sendMidiNote - Function to send MIDI note: (channel, note, velocity, duration)
 */
export function useMidiPlayer({ getCurrentTime, sendMidiNote }) {
  const scheduledEventsRef = useRef([]);
  const isPlayingRef = useRef(false);
  const animationFrameRef = useRef(null);

  /**
   * Player tick - runs at 60fps via requestAnimationFrame
   * Checks scheduled events and fires those whose timestamp has arrived
   */
  const playerTick = useCallback(() => {
    if (!isPlayingRef.current) return;

    const now = getCurrentTime();

    // Find all events whose time has arrived
    const readyEvents = scheduledEventsRef.current.filter(event => event.timestamp <= now);

    // Fire ready events
    readyEvents.forEach(event => {
      if (sendMidiNote) {
        sendMidiNote(event.channel, event.note, event.velocity, event.duration);
      }
    });

    // Remove fired events from the queue
    scheduledEventsRef.current = scheduledEventsRef.current.filter(event => event.timestamp > now);

    // Continue the loop
    if (isPlayingRef.current) {
      animationFrameRef.current = requestAnimationFrame(playerTick);
    }
  }, [getCurrentTime, sendMidiNote]);

  /**
   * Schedule a MIDI note event with a timestamp
   * @param {number} timestamp - When to fire the note (in seconds, from audio context)
   * @param {number} channel - MIDI channel
   * @param {number} note - MIDI note number
   * @param {number} velocity - Note velocity (0-127)
   * @param {number} duration - Note duration in milliseconds
   */
  const scheduleNote = useCallback((timestamp, channel, note, velocity, duration = 20) => {
    scheduledEventsRef.current.push({
      timestamp,
      channel,
      note,
      velocity,
      duration,
    });
  }, []);

  /**
   * Schedule multiple notes at once
   * @param {Array<{timestamp, channel, note, velocity, duration}>} events - Events to schedule
   */
  const scheduleNotes = useCallback((events) => {
    scheduledEventsRef.current.push(...events);
  }, []);

  /**
   * Start the MIDI player
   */
  const start = useCallback(() => {
    if (isPlayingRef.current) return;

    isPlayingRef.current = true;
    animationFrameRef.current = requestAnimationFrame(playerTick);
  }, [playerTick]);

  /**
   * Stop the MIDI player
   */
  const stop = useCallback(() => {
    isPlayingRef.current = false;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  /**
   * Clear all scheduled events
   */
  const clearScheduledEvents = useCallback(() => {
    scheduledEventsRef.current = [];
  }, []);

  /**
   * Get number of events currently scheduled
   * @returns {number} Queue size
   */
  const getQueueSize = useCallback(() => {
    return scheduledEventsRef.current.length;
  }, []);

  /**
   * Get all scheduled events (for debugging)
   * @returns {Array} Scheduled events
   */
  const getScheduledEvents = useCallback(() => {
    return [...scheduledEventsRef.current];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    scheduleNote,
    scheduleNotes,
    start,
    stop,
    clearScheduledEvents,
    getQueueSize,
    getScheduledEvents,
  };
}
