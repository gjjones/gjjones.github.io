import { useState, useCallback } from 'react';

/**
 * Manages sequencer state (sequences, view, tempo)
 * Separated from playback timing logic for better organization
 */
export function useSequencerState() {
  // Test sequence (predefined pattern to replicate)
  const [testSequence] = useState([
    // HH: eighth notes on every step
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    // SN: backbeat (steps 4, 12)
    [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],
    // KD: four on the floor (steps 0, 4, 8, 12)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
  ]);

  // User sequence (starts empty)
  const [userSequence, setUserSequence] = useState([
    Array(16).fill(false), // HH
    Array(16).fill(false), // SN
    Array(16).fill(false), // KD
  ]);

  const [activeView, setActiveView] = useState('user'); // 'user' or 'test'
  const [bpm, setBpm] = useState(120);

  // Toggle a step in the user sequence
  const toggleStep = useCallback((trackIndex, stepIndex) => {
    setUserSequence((prev) => {
      const newSequence = prev.map((track) => [...track]);
      newSequence[trackIndex][stepIndex] = !newSequence[trackIndex][stepIndex];
      return newSequence;
    });
  }, []);

  // Get the current sequence based on active view
  const currentSequence = activeView === 'test' ? testSequence : userSequence;

  return {
    testSequence,
    userSequence,
    currentSequence,
    activeView,
    setActiveView,
    bpm,
    setBpm,
    toggleStep,
  };
}
