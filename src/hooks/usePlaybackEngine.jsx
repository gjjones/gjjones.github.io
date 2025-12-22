import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Manages playback timing and MIDI note triggering
 * Separated from sequencer state for better organization
 *
 * @param {Object} params
 * @param {Array} params.sequence - Current sequence to play
 * @param {number} params.bpm - Beats per minute
 * @param {Function} params.sendNoteTrigger - MIDI note trigger function
 * @param {number} params.division - Note division (1=quarter, 2=eighth, 4=sixteenth)
 * @param {number} params.totalSteps - Total number of steps in the pattern
 */
export function usePlaybackEngine({ sequence, bpm, sendNoteTrigger, division, totalSteps }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const playbackTimerRef = useRef(null);
  const sendNoteTriggerRef = useRef(sendNoteTrigger);
  const sequenceRef = useRef(sequence);

  // Calculate step duration in milliseconds based on note division
  // division: 1 = quarter notes, 2 = eighth notes, 4 = sixteenth notes
  const stepDuration = (60 / bpm) * 1000 / division;

  // MIDI note mappings (Channel 10 - drums)
  const NOTE_MAP = {
    0: 42, // HH - Hi-Hat
    1: 38, // SN - Snare
    2: 36, // KD - Kick
  };

  // Keep refs in sync
  useEffect(() => {
    sendNoteTriggerRef.current = sendNoteTrigger;
  }, [sendNoteTrigger]);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  // Start playback
  const start = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentStep(-1);
  }, [isPlaying]);

  // Stop playback
  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(-1);
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
  }, []);

  // Restart playback from beginning (without stopping)
  const restart = useCallback(() => {
    if (isPlaying) {
      setCurrentStep(-1);
    }
  }, [isPlaying]);

  // Playback engine
  useEffect(() => {
    if (!isPlaying) {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
      return;
    }

    // Set up interval for step progression
    playbackTimerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % totalSteps;

        // Trigger notes for the new step using current ref values
        if (nextStep >= 0 && nextStep < totalSteps) {
          const currentSequence = sequenceRef.current;
          const triggerFn = sendNoteTriggerRef.current;
          currentSequence.forEach((track, trackIndex) => {
            if (track[nextStep] && triggerFn) {
              const note = NOTE_MAP[trackIndex];
              triggerFn(10, note, 100, 20);
            }
          });
        }

        return nextStep;
      });
    }, stepDuration);

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    };
  }, [isPlaying, stepDuration]);

  return {
    isPlaying,
    currentStep,
    start,
    stop,
    restart,
  };
}
