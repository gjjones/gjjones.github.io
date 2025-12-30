import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 1: The Kick/Snare Skeleton
 *
 * Learning Goal: Identify kick drum placement on "The One" (step 0) vs "The Three" (step 8)
 * Grid: 8-step (eighth note) grid, 2 measures = 16 total steps
 * Constraint: Snare is LOCKED on beats 2 & 4 (steps 2, 6, 10, 14)
 * Focus: Where does the kick land relative to the downbeats?
 */

export const LESSON_1_METADATA = {
  id: 'lesson-1-kick-snare-skeleton',
  phase: 1,
  lessonNumber: 1,
  title: 'The Kick/Snare Skeleton',
  concept: 'Identifying kick placement on "The One" vs "The Three"',
  quality: 'downbeat-identification',
  description: '8-step grid with snare fixed on beats 2 & 4. Focus on transcribing kick patterns.',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 8,  // 8th note resolution
  measures: 2,

  constraints: {
    locked: {
      SN: [2, 6, 10, 14]  // Snare locked on beats 2 & 4 (steps 2, 6, 10, 14)
    },
    available: ['KD']  // Only kick drum is editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns identifying kick placement on downbeats (beats 1 and/or 3)',
  prerequisites: [],
  nextLessons: ['lesson-2-the-ands'],

  genreContext: {
    primary: 'Rock, Pop, Hip-hop basics',
    description: 'The kick/snare skeleton is the foundation of most popular music. The "backbeat" (snare on 2 & 4) is universal, while kick patterns vary by style and feel.',
  }
};

/**
 * Lesson 1 Patterns (15 total: 5 easy, 5 medium, 5 hard)
 *
 * EASY (Patterns 1-5): 1-2 kicks, tempo 82-89 BPM
 * - Clear downbeat placement
 * - Simple, unambiguous patterns
 *
 * MEDIUM (Patterns 6-10): 2-3 kicks, tempo 82-89 BPM
 * - More kick variations
 * - Introduce anticipations
 *
 * HARD (Patterns 11-15): 3-4 kicks, tempo 81-88 BPM
 * - Complex kick patterns
 * - Multiple placements per measure with syncopation
 */

export const LESSON_1_PATTERNS = [
  // ===== PATTERN 1: EASY - Kick on beat 1 only =====
  // Simplest pattern: kick just on "The One"
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // KD (only on beat 1)
  ], 'eighth', 2, 83, ['downbeat-identification'], 'easy'),

  // ===== PATTERN 2: EASY - Kick on beat 3 only =====
  // Simple: kick on "The Three"
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],   // KD (only on beat 3)
  ], 'eighth', 2, 87, ['downbeat-identification'], 'easy'),

  // ===== PATTERN 3: EASY - Classic rock beat =====
  // Kicks on beat 1 of each measure - most fundamental pattern in popular music
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (on 1 & 3)
  ], 'eighth', 2, 85, ['downbeat-identification', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 4: EASY - Kick on beat 2 only =====
  // Kick on beat 2 (unusual but simple)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],  // KD (only on beat 2)
  ], 'eighth', 2, 84, ['downbeat-identification'], 'easy'),

  // ===== PATTERN 5: EASY - Kick on beats 1 & 2 =====
  // Two kicks close together
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],    // KD (beats 1 & 2)
  ], 'eighth', 2, 89, ['downbeat-identification', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Kick on 1, and-of-2 =====
  // Introduces the "and" (step 5)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],    // KD (1, and-of-2)
  ], 'eighth', 2, 89, ['downbeat-identification', 'kick-drum-precision'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Kick on 1, 3, and-of-3 =====
  // Adds a third kick on the "and-of-3"
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false],     // KD (1, 3, and-of-3)
  ], 'eighth', 2, 82, ['downbeat-identification', 'kick-drum-precision'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Kick on and-of-1, 3 =====
  // Kick starts on the "and" of beat 1
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (and-of-1, 3)
  ], 'eighth', 2, 86, ['downbeat-identification', 'syncopation'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Kick on 1, and-of-1, 3 =====
  // Three kicks with one syncopated
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-1, 3)
  ], 'eighth', 2, 83, ['downbeat-identification', 'kick-drum-precision', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Four-on-the-floor =====
  // Kick on all 4 quarter note beats per measure (8 kicks total)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],      // KD (all 4 beats both measures)
  ], 'eighth', 2, 84, ['downbeat-identification', 'backbeat-placement'], 'medium'),

  // ===== PATTERN 11: HARD - Syncopated kicks =====
  // Kicks on 1, and-of-2, and-of-3
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false],     // KD (1, and-of-2, and-of-3)
  ], 'eighth', 2, 88, ['downbeat-identification', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Complex pattern with four kicks =====
  // Kicks on 1, and-of-1, 3, and-of-3
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false],      // KD (1, and-of-1, 3, and-of-3)
  ], 'eighth', 2, 81, ['downbeat-identification', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Funky syncopation =====
  // Kicks on and-of-1, and-of-2, 3, and-of-4
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, true, false, false, true, false, false, false, false, false, false, true],      // KD (and-of-1, and-of-2, 3, and-of-4)
  ], 'eighth', 2, 85, ['downbeat-identification', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Maximum syncopation =====
  // Kicks on and-of-1, 3, and-of-3, and-of-4 (all syncopated except one downbeat)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, false, false, false, true, false, false, false, false, true, false, true],      // KD (and-of-1, 3, and-of-3, and-of-4)
  ], 'eighth', 2, 82, ['downbeat-identification', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Varied placement =====
  // Kicks on 1, and-of-2, and-of-3, and-of-4 (downbeat + three syncopations)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true],      // KD (1, and-of-2, and-of-3, and-of-4)
  ], 'eighth', 2, 86, ['downbeat-identification', 'kick-drum-precision', 'syncopation'], 'hard'),
];

/**
 * Complete Lesson 1 definition
 * Combines metadata and patterns
 */
export const LESSON_1 = {
  ...LESSON_1_METADATA,
  patterns: LESSON_1_PATTERNS,
};

export default LESSON_1;
