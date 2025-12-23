import { useSequencerState } from './useSequencerState';
import { usePlaybackEngine } from './usePlaybackEngine';

/**
 * Main sequencer hook - orchestrates state and playback
 * Combines useSequencerState and usePlaybackEngine while maintaining the same API
 *
 * @param {Function} sendNoteTrigger - MIDI note trigger function from useMidi
 * @param {String} playbackMode - Which sequence to play: 'user' or 'hidden'
 * @param {Object} quizDefinition - Quiz configuration with patterns and metadata
 * @param {Function} getMidiParams - Function to get MIDI params for a track index
 * @param {Array} instruments - Array of instrument configurations
 */
export function useSequencer(sendNoteTrigger, playbackMode = 'user', quizDefinition, getMidiParams, instruments) {
  // State management (sequences, quiz state, tempo)
  const {
    hiddenSequences,
    currentHiddenSequence,
    userSequence,
    currentPattern,
    currentQuestionIndex,
    quizResults,
    isQuizComplete,
    hasSubmitted,
    totalQuestions,
    toggleStep,
    submitAnswer,
    goToNextQuestion,
    restartQuiz,
    exitQuiz,
    bpm,
    setBpm,
  } = useSequencerState(quizDefinition);

  // Determine which sequence to play
  const playbackSequence = playbackMode === 'hidden' ? currentHiddenSequence : userSequence;

  // Playback engine (timing, MIDI triggering)
  const {
    isPlaying,
    currentStep,
    start,
    stop,
    restart,
    getMusicalPosition,
  } = usePlaybackEngine({
    sequence: playbackSequence,
    bpm,
    scheduleNoteFn: sendNoteTrigger,
    getMidiParams,
    division: currentPattern.division,
    totalSteps: currentPattern.totalSteps,
  });

  // Return combined API
  return {
    // Sequences
    hiddenSequences,
    currentHiddenSequence,
    userSequence,
    currentPattern,

    // Quiz state
    currentQuestionIndex,
    quizResults,
    isQuizComplete,
    hasSubmitted,
    totalQuestions,

    // Quiz actions
    submitAnswer,
    goToNextQuestion,
    restartQuiz,
    exitQuiz,

    // Sequencer actions
    toggleStep,

    // Playback state
    isPlaying,
    currentStep,
    start,
    stop,
    restart,
    getMusicalPosition,

    // Other
    bpm,
    setBpm,
    instruments,
  };
}
