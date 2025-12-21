import { useSequencerState } from './useSequencerState';
import { usePlaybackEngine } from './usePlaybackEngine';

/**
 * Main sequencer hook - orchestrates state and playback
 * Combines useSequencerState and usePlaybackEngine while maintaining the same API
 *
 * @param {Function} sendNoteTrigger - MIDI note trigger function from useMidi
 * @param {String} playbackMode - Which sequence to play: 'user' or 'hidden'
 */
export function useSequencer(sendNoteTrigger, playbackMode = 'user') {
  // State management (sequences, quiz state, tempo)
  const {
    hiddenSequences,
    currentHiddenSequence,
    userSequence,
    currentQuestionIndex,
    quizResults,
    isQuizComplete,
    hasSubmitted,
    toggleStep,
    submitAnswer,
    goToNextQuestion,
    restartQuiz,
    bpm,
    setBpm,
  } = useSequencerState();

  // Determine which sequence to play
  const playbackSequence = playbackMode === 'hidden' ? currentHiddenSequence : userSequence;

  // Playback engine (timing, MIDI triggering)
  const {
    isPlaying,
    currentStep,
    start,
    stop,
    restart,
  } = usePlaybackEngine({
    sequence: playbackSequence,
    bpm,
    sendNoteTrigger,
  });

  // Return combined API
  return {
    // Sequences
    hiddenSequences,
    currentHiddenSequence,
    userSequence,

    // Quiz state
    currentQuestionIndex,
    quizResults,
    isQuizComplete,
    hasSubmitted,

    // Quiz actions
    submitAnswer,
    goToNextQuestion,
    restartQuiz,

    // Sequencer actions
    toggleStep,

    // Playback state
    isPlaying,
    currentStep,
    start,
    stop,
    restart,

    // Other
    bpm,
    setBpm,
  };
}
