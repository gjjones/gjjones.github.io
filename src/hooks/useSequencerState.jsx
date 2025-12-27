import { useState, useCallback, useEffect } from 'react';
import { createEmptySequence, createSequenceWithLockedCells } from '../utils/patternUtils';
import { useWarmupMode } from './useWarmupMode';

/**
 * Manages sequencer state (sequences, quiz progression, tempo)
 * Separated from playback timing logic for better organization
 * @param {object} quizDefinition - Quiz configuration with patterns and metadata
 * @param {Array} instruments - Array of instrument configurations
 */
export function useSequencerState(quizDefinition, instruments = []) {
  // Warmup mode hook
  const { applyWarmup } = useWarmupMode();

  // Quiz patterns from definition
  const [hiddenSequences, setHiddenSequences] = useState(quizDefinition.patterns);
  const totalQuestions = quizDefinition.totalQuestions || quizDefinition.patterns.length;

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Get the current pattern
  const currentPattern = hiddenSequences[currentQuestionIndex];

  // User sequence - initialized with locked cells pre-filled for lessons
  const [userSequence, setUserSequence] = useState(() => {
    const constraints = quizDefinition.constraints;
    const trackCount = instruments.length || 3;
    if (constraints && instruments.length > 0) {
      return createSequenceWithLockedCells(currentPattern.totalSteps, constraints, instruments);
    }
    return createEmptySequence(currentPattern.totalSteps, trackCount);
  });
  const [quizResults, setQuizResults] = useState(Array(totalQuestions).fill(null)); // null = not attempted, true = correct, false = incorrect
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Initialize BPM from first pattern's tempo, or fall back to 120
  const initialBpm = quizDefinition.patterns?.[0]?.tempo || 120;
  const [bpm, setBpm] = useState(applyWarmup(initialBpm));

  // Reset state when quiz changes
  useEffect(() => {
    setHiddenSequences(quizDefinition.patterns);
    setCurrentQuestionIndex(0);
    const numQuestions = quizDefinition.totalQuestions || quizDefinition.patterns.length;
    setQuizResults(Array(numQuestions).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);

    // Reset BPM to first pattern's tempo
    const initialBpm = quizDefinition.patterns?.[0]?.tempo || 120;
    setBpm(applyWarmup(initialBpm));

    // Initialize with locked cells if it's a lesson
    const constraints = quizDefinition.constraints;
    const trackCount = instruments.length || 3;
    if (constraints && instruments.length > 0) {
      setUserSequence(createSequenceWithLockedCells(quizDefinition.patterns[0].totalSteps, constraints, instruments));
    } else {
      setUserSequence(createEmptySequence(quizDefinition.patterns[0].totalSteps, trackCount));
    }
  }, [quizDefinition.id, instruments]);

  // Toggle a step in the user sequence
  const toggleStep = useCallback((trackIndex, stepIndex) => {
    setUserSequence((prev) => {
      const newSequence = prev.map((track) => [...track]);
      newSequence[trackIndex][stepIndex] = !newSequence[trackIndex][stepIndex];
      return newSequence;
    });
  }, []);

  // Submit the current answer
  const submitAnswer = useCallback(() => {
    const hiddenSeq = hiddenSequences[currentQuestionIndex].steps;
    const isCorrect = userSequence.every((track, trackIdx) =>
      track.every((step, stepIdx) => step === hiddenSeq[trackIdx][stepIdx])
    );

    setQuizResults((prev) => {
      const newResults = [...prev];
      newResults[currentQuestionIndex] = isCorrect;
      return newResults;
    });
    setHasSubmitted(true);
  }, [currentQuestionIndex, userSequence, hiddenSequences]);

  // Move to the next question
  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const nextPattern = hiddenSequences[nextIndex];
      setCurrentQuestionIndex(nextIndex);

      // Update BPM to next pattern's tempo (if it has one)
      if (nextPattern.tempo) {
        setBpm(applyWarmup(nextPattern.tempo));
      }

      // Initialize with locked cells if it's a lesson
      const constraints = quizDefinition.constraints;
      const trackCount = instruments.length || 3;
      if (constraints && instruments.length > 0) {
        setUserSequence(createSequenceWithLockedCells(nextPattern.totalSteps, constraints, instruments));
      } else {
        setUserSequence(createEmptySequence(nextPattern.totalSteps, trackCount));
      }
      setHasSubmitted(false);
    } else {
      // Quiz is complete
      setIsQuizComplete(true);
    }
  }, [currentQuestionIndex, totalQuestions, hiddenSequences, quizDefinition.constraints, instruments]);

  // Restart the entire quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizResults(Array(totalQuestions).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);

    // Reset BPM to first pattern's tempo
    const initialBpm = hiddenSequences[0]?.tempo || 120;
    setBpm(applyWarmup(initialBpm));

    // Initialize with locked cells if it's a lesson
    const constraints = quizDefinition.constraints;
    const trackCount = instruments.length || 3;
    if (constraints && instruments.length > 0) {
      setUserSequence(createSequenceWithLockedCells(hiddenSequences[0].totalSteps, constraints, instruments));
    } else {
      setUserSequence(createEmptySequence(hiddenSequences[0].totalSteps, trackCount));
    }
  }, [totalQuestions, hiddenSequences, quizDefinition.constraints, instruments]);

  // Exit quiz and return to menu (cleans up all state)
  const exitQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizResults(Array(totalQuestions).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);

    // Initialize with locked cells if it's a lesson
    const constraints = quizDefinition.constraints;
    if (constraints && instruments.length > 0) {
      setUserSequence(createSequenceWithLockedCells(hiddenSequences[0].totalSteps, constraints, instruments));
    } else {
      setUserSequence(createEmptySequence(hiddenSequences[0].totalSteps));
    }
  }, [totalQuestions, hiddenSequences, quizDefinition.constraints, instruments]);

  // Get the current hidden sequence for the current question
  const currentHiddenSequence = currentPattern.steps;

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

    // Actions
    toggleStep,
    submitAnswer,
    goToNextQuestion,
    restartQuiz,
    exitQuiz,

    // Other state
    bpm,
    setBpm,
  };
}
