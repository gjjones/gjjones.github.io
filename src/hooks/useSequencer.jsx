import { useSequencerState } from './useSequencerState';
import { usePlaybackEngine } from './usePlaybackEngine';

/**
 * Main sequencer hook - orchestrates state and playback
 * Combines useSequencerState and usePlaybackEngine while maintaining the same API
 *
 * @param {Function} sendNoteTrigger - MIDI note trigger function from useMidi
 */
export function useSequencer(sendNoteTrigger) {
  // State management (sequences, view, tempo)
  const {
    testSequence,
    userSequence,
    currentSequence,
    activeView,
    setActiveView,
    bpm,
    setBpm,
    toggleStep,
  } = useSequencerState();

  // Playback engine (timing, MIDI triggering)
  const {
    isPlaying,
    currentStep,
    start,
    stop,
    restart,
  } = usePlaybackEngine({
    sequence: currentSequence,
    bpm,
    sendNoteTrigger,
  });

  // Return combined API (maintains backward compatibility)
  return {
    testSequence,
    userSequence,
    currentSequence,
    activeView,
    setActiveView,
    bpm,
    setBpm,
    isPlaying,
    currentStep,
    toggleStep,
    start,
    stop,
    restart,
  };
}
