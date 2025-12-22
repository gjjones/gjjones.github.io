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

  backbeatFocus: {
    id: 'backbeatFocus',
    title: 'Backbeat Basics',
    description: 'Snare locked on 2 & 4 - practice hi-hat and kick variations',
    difficulty: 'beginner',
    totalQuestions: 6,
    patterns: [
      // Pattern 1: Kick on 1 & 3, steady eighth hi-hats (classic rock beat)
      createPattern([
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (eighths)
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],      // SN (on 2 & 4)
        [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (on 1 & 3)
      ], 'eighth', 2),
      // Pattern 2: Kick on 1, 3, and-of-3, steady eighth hi-hats
      createPattern([
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (eighths)
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],      // SN (on 2 & 4)
        [true, false, false, false, true, true, false, false, true, false, false, false, true, true, false, false],        // KD (1, 3, and-of-3)
      ], 'eighth', 2),
      // Pattern 3: Kick on 1 and and-of-2, steady eighth hi-hats
      createPattern([
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (eighths)
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],      // SN (on 2 & 4)
        [true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false],      // KD (1, and-of-2)
      ], 'eighth', 2),
      // Pattern 4: Kick on 1, and-of-1, 3, quarter note hi-hats
      createPattern([
        [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],          // HH (quarters)
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],      // SN (on 2 & 4)
        [true, true, false, false, true, false, false, false, true, true, false, false, true, false, false, false],        // KD (1, and-of-1, 3)
      ], 'eighth', 2),
      // Pattern 5: Kick on 1 & 3, syncopated hi-hats (pattern 1)
      createPattern([
        [true, false, true, true, false, true, false, true, true, false, true, true, false, true, false, true],            // HH (syncopated)
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],      // SN (on 2 & 4)
        [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (1 & 3)
      ], 'eighth', 2),
      // Pattern 6: Kick on 1, and-of-2, 3, syncopated hi-hats (pattern 2)
      createPattern([
        [true, true, false, true, false, false, true, true, true, true, false, true, false, false, true, true],            // HH (syncopated variation)
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],      // SN (on 2 & 4)
        [true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false],        // KD (1, and-of-2, 3)
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
