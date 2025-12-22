import { useState, useCallback } from 'react';
import { createPattern, createEmptySequence } from '../utils/patternUtils';

/**
 * Manages sequencer state (sequences, quiz progression, tempo)
 * Separated from playback timing logic for better organization
 */
export function useSequencerState() {
  // Quiz: 5 hidden sequences with progressive difficulty
  const [hiddenSequences] = useState([
    // Question 1 - EASY: Simple four-on-the-floor kick
    createPattern([
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // SN
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD
    ], 'eighth', 2),
    // Question 2 - EASY-MEDIUM: Add snare backbeat (2 and 4)
    createPattern([
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD
    ], 'eighth', 2),
    // Question 3 - MEDIUM: Basic rock beat (kick + snare + hi-hat eighth notes)
    createPattern([
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD
    ], 'eighth', 2),
    // Question 4 - MEDIUM-HARD: Syncopated hi-hat pattern
    createPattern([
      [true, false, true, false, true, false, true, true, true, false, true, false, true, false, true, true],            // HH (syncopated)
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
      [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (half-time)
    ], 'eighth', 2),
    // Question 5 - HARD: Complex polyrhythm
    createPattern([
      [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],        // HH (3:4 polyrhythm)
      [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true],      // SN (offbeat)
      [true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false],      // KD (irregular)
    ], 'eighth', 2),
  ]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Get the current pattern
  const currentPattern = hiddenSequences[currentQuestionIndex];

  // User sequence (starts empty) - initialized with current pattern's step count
  const [userSequence, setUserSequence] = useState(
    createEmptySequence(currentPattern.totalSteps)
  );
  const [quizResults, setQuizResults] = useState(Array(5).fill(null)); // null = not attempted, true = correct, false = incorrect
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [bpm, setBpm] = useState(120);

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
    if (currentQuestionIndex < 4) {
      const nextIndex = currentQuestionIndex + 1;
      const nextPattern = hiddenSequences[nextIndex];
      setCurrentQuestionIndex(nextIndex);
      setUserSequence(createEmptySequence(nextPattern.totalSteps));
      setHasSubmitted(false);
    } else {
      // Quiz is complete
      setIsQuizComplete(true);
    }
  }, [currentQuestionIndex, hiddenSequences]);

  // Restart the entire quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizResults(Array(5).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);
    setUserSequence(createEmptySequence(hiddenSequences[0].totalSteps));
  }, [hiddenSequences]);

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

    // Actions
    toggleStep,
    submitAnswer,
    goToNextQuestion,
    restartQuiz,

    // Other state
    bpm,
    setBpm,
  };
}
