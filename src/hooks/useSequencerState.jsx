import { useState, useCallback, useEffect } from 'react';
import { createEmptySequence } from '../utils/patternUtils';

/**
 * Manages sequencer state (sequences, quiz progression, tempo)
 * Separated from playback timing logic for better organization
 * @param {object} quizDefinition - Quiz configuration with patterns and metadata
 */
export function useSequencerState(quizDefinition) {
  // Quiz patterns from definition
  const [hiddenSequences, setHiddenSequences] = useState(quizDefinition.patterns);
  const totalQuestions = quizDefinition.totalQuestions;

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Get the current pattern
  const currentPattern = hiddenSequences[currentQuestionIndex];

  // User sequence (starts empty) - initialized with current pattern's step count
  const [userSequence, setUserSequence] = useState(
    createEmptySequence(currentPattern.totalSteps)
  );
  const [quizResults, setQuizResults] = useState(Array(totalQuestions).fill(null)); // null = not attempted, true = correct, false = incorrect
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [bpm, setBpm] = useState(120);

  // Reset state when quiz changes
  useEffect(() => {
    setHiddenSequences(quizDefinition.patterns);
    setCurrentQuestionIndex(0);
    setQuizResults(Array(quizDefinition.totalQuestions).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);
    setUserSequence(createEmptySequence(quizDefinition.patterns[0].totalSteps));
  }, [quizDefinition.id]);

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
      setUserSequence(createEmptySequence(nextPattern.totalSteps));
      setHasSubmitted(false);
    } else {
      // Quiz is complete
      setIsQuizComplete(true);
    }
  }, [currentQuestionIndex, totalQuestions, hiddenSequences]);

  // Restart the entire quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizResults(Array(totalQuestions).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);
    setUserSequence(createEmptySequence(hiddenSequences[0].totalSteps));
  }, [totalQuestions, hiddenSequences]);

  // Exit quiz and return to menu (cleans up all state)
  const exitQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizResults(Array(totalQuestions).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);
    setUserSequence(createEmptySequence(hiddenSequences[0].totalSteps));
  }, [totalQuestions, hiddenSequences]);

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
