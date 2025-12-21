import { useState, useCallback } from 'react';

/**
 * Manages sequencer state (sequences, quiz progression, tempo)
 * Separated from playback timing logic for better organization
 */
export function useSequencerState() {
  // Quiz: 5 hidden sequences with progressive difficulty
  const [hiddenSequences] = useState([
    // Question 1 - EASY: Simple four-on-the-floor kick
    [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // SN
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD
    ],
    // Question 2 - EASY-MEDIUM: Add snare backbeat (2 and 4)
    [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD
    ],
    // Question 3 - MEDIUM: Basic rock beat (kick + snare + hi-hat eighth notes)
    [
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD
    ],
    // Question 4 - MEDIUM-HARD: Syncopated hi-hat pattern
    [
      [true, false, true, false, true, false, true, true, true, false, true, false, true, false, true, true],            // HH (syncopated)
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
      [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (half-time)
    ],
    // Question 5 - HARD: Complex polyrhythm
    [
      [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],        // HH (3:4 polyrhythm)
      [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true],      // SN (offbeat)
      [true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false],      // KD (irregular)
    ],
  ]);

  // User sequence (starts empty)
  const [userSequence, setUserSequence] = useState([
    Array(16).fill(false), // HH
    Array(16).fill(false), // SN
    Array(16).fill(false), // KD
  ]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    const hiddenSeq = hiddenSequences[currentQuestionIndex];
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
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserSequence([
        Array(16).fill(false),
        Array(16).fill(false),
        Array(16).fill(false),
      ]);
      setHasSubmitted(false);
    } else {
      // Quiz is complete
      setIsQuizComplete(true);
    }
  }, [currentQuestionIndex]);

  // Restart the entire quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizResults(Array(5).fill(null));
    setIsQuizComplete(false);
    setHasSubmitted(false);
    setUserSequence([
      Array(16).fill(false),
      Array(16).fill(false),
      Array(16).fill(false),
    ]);
  }, []);

  // Get the current hidden sequence for the current question
  const currentHiddenSequence = hiddenSequences[currentQuestionIndex];

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
