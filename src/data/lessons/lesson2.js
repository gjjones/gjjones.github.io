import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 2: The "Ands" (Off-beat Kick)
 *
 * Learning Goal: Identify kick drum on the "upbeats" (the "ands" between beats)
 * Grid: 8-step (eighth note) grid, 2 measures = 16 total steps
 * Constraint: Snare is LOCKED on beats 2 & 4 (steps 2, 6, 10, 14)
 * Focus: Kick on steps 1, 3, 5, 7, 9, 11, 13, 15 (the "ands")
 */

export const LESSON_2_METADATA = {
  id: 'lesson-2-the-ands',
  phase: 1,
  lessonNumber: 2,
  title: 'The "Ands" (Off-beat Kick)',
  concept: 'Identifying kick placement on the "upbeats" (ands)',
  quality: 'upbeat-identification',
  description: '8-step grid with snare fixed on beats 2 & 4. Focus on kicks landing between beats.',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 8,  // 8th note resolution
  measures: 2,

  constraints: {
    locked: {
      SN: [2, 6, 10, 14]  // Snare locked on beats 2 & 4
    },
    available: ['KD']  // Only kick drum is editable
  },

  tempos: [85, 115],
  learningGoal: 'Transcribe 10 patterns with kick on the upbeats (ands) instead of downbeats',
  prerequisites: ['lesson-1-kick-snare-skeleton'],
  nextLessons: ['lesson-3-hi-hat-anchor'],

  genreContext: {
    primary: 'Funk, R&B, Reggae',
    description: 'Off-beat kicks create syncopation and groove. Common in funk, reggae, and modern R&B.',
  }
};

/**
 * Lesson 2 Patterns
 *
 * Focus on kicks landing on the "ands" (upbeats):
 * - Steps 1, 3, 5, 7, 9, 11, 13, 15 (odd steps)
 *
 * Patterns 1-3: EASY - Single "and" placements
 * Patterns 4-7: MEDIUM - Multiple "ands"
 * Patterns 8-10: HARD - Complex syncopation
 */

export const LESSON_2_PATTERNS = [
  // ===== PATTERN 1: EASY - Kick on "and-of-1" only =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // KD (and-of-1)
  ], 'eighth', 2, 84, ['upbeat-identification']),

  // ===== PATTERN 2: EASY - Kick on "and-of-3" only =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false],   // KD (and-of-3)
  ], 'eighth', 2, 88, ['upbeat-identification']),

  // ===== PATTERN 3: EASY - Kicks on "and-of-1" and "and-of-3" =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false],    // KD (and-of-1, and-of-3)
  ], 'eighth', 2, 86, ['upbeat-identification']),

  // ===== PATTERN 4: MEDIUM - Kick on "and-of-2" =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],   // KD (and-of-2)
  ], 'eighth', 2, 82, ['upbeat-identification', 'eighth-note-precision']),

  // ===== PATTERN 5: MEDIUM - Kicks on "and-of-1" and "and-of-2" =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false],    // KD (and-of-1, and-of-2)
  ], 'eighth', 2, 87, ['upbeat-identification', 'eighth-note-precision']),

  // ===== PATTERN 6: MEDIUM - All four "ands" =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false],      // KD (all ands)
  ], 'eighth', 2, 85, ['upbeat-identification', 'syncopation']),

  // ===== PATTERN 7: MEDIUM - Mix of downbeats and upbeats =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false],     // KD (1, and-of-2, and-of-3)
  ], 'eighth', 2, 89, ['upbeat-identification', 'eighth-note-precision', 'syncopation']),

  // ===== PATTERN 8: HARD - Syncopated pattern =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, true, false, false, false, true, false, true, false, false, false, false, false, true],       // KD (lots of ands)
  ], 'eighth', 2, 83, ['upbeat-identification', 'kick-drum-precision', 'syncopation']),

  // ===== PATTERN 9: HARD - Complex upbeat pattern =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false],      // KD (and-of-e-1, and-of-2, and-of-e-3, and-of-4)
  ], 'eighth', 2, 86, ['upbeat-identification', 'kick-drum-precision', 'syncopation']),

  // ===== PATTERN 10: HARD - Completely off-beat =====
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, true],      // KD (all ands of all 4 beats)
  ], 'eighth', 2, 84, ['upbeat-identification', 'kick-drum-precision', 'syncopation']),
];

/**
 * Complete Lesson 2 definition
 */
export const LESSON_2 = {
  ...LESSON_2_METADATA,
  patterns: LESSON_2_PATTERNS,
};

export default LESSON_2;
