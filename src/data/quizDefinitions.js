import { createPattern } from '../utils/patternUtils.js';

/**
 * Central registry of all available quizzes
 * Each quiz contains metadata and pattern definitions
 */
export const QUIZ_DEFINITIONS = {
  basicGrooves: {
    id: 'basicGrooves',
    title: 'Basic Grooves',
    description: 'Master fundamental rock and pop drum patterns',
    difficulty: 'beginner',
    totalQuestions: 5,
    patterns: [
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
    ],
  },

  // Future quizzes can be added here, for example:
  // hiHatPatterns: {
  //   id: 'hiHatPatterns',
  //   title: 'Hi-Hat Mastery',
  //   description: 'Complex hi-hat rhythms and variations',
  //   difficulty: 'intermediate',
  //   totalQuestions: 4,
  //   patterns: [
  //     createPattern([...], 'sixteenth', 2),
  //     // ... more patterns
  //   ]
  // },
};

/**
 * Get a specific quiz by its ID
 * @param {string} quizId - The unique identifier for the quiz
 * @returns {object|undefined} The quiz definition or undefined if not found
 */
export function getQuizById(quizId) {
  return QUIZ_DEFINITIONS[quizId];
}

/**
 * Get all quizzes as an array
 * @returns {Array} Array of all quiz definitions
 */
export function getAllQuizzes() {
  return Object.values(QUIZ_DEFINITIONS);
}

/**
 * Color mapping for difficulty levels
 * Used for UI badges and visual indicators
 */
export const DIFFICULTY_COLORS = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};
