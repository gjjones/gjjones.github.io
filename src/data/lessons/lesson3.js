import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 3: The Hi-Hat Anchor (Steady 8ths)
 *
 * Learning Goal: Use steady hi-hats as a rhythmic guide while transcribing kick patterns
 * Grid: 8-step (eighth note) grid, 2 measures = 16 total steps
 * Constraint: Hi-Hat plays on ALL steps (steady 8ths), Snare locked on beats 2 & 4
 * Focus: Transcribing kick patterns with a constant hi-hat reference
 */

export const LESSON_3_METADATA = {
  id: 'lesson-3-hi-hat-anchor',
  phase: 1,
  lessonNumber: 3,
  title: 'The Hi-Hat Anchor (Steady 8ths)',
  concept: 'Using steady hi-hats as a rhythmic reference point',
  quality: 'rhythmic-anchoring',
  description: '8-step grid with hi-hats on all steps and snare on 2 & 4. Transcribe kick patterns.',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 8,  // 8th note resolution
  measures: 2,

  constraints: {
    locked: {
      HH: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],  // All steps
      SN: [2, 6, 10, 14]  // Snare on beats 2 & 4
    },
    available: ['KD']  // Only kick drum is editable
  },

  tempos: [85, 115],
  learningGoal: 'Transcribe 10 kick patterns while using steady hi-hats as a timing reference',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands'],
  nextLessons: ['lesson-4-16th-note-hitch'],

  genreContext: {
    primary: 'Rock, Pop',
    description: 'Steady eighth-note hi-hats are the foundation of most rock and pop beats, providing constant pulse.',
  }
};

/**
 * Lesson 3 Patterns
 *
 * All patterns have steady hi-hats on every 8th note
 * Focus: Transcribing kick patterns with this constant reference
 *
 * Patterns 1-3: EASY - Basic kick patterns (downbeats)
 * Patterns 4-7: MEDIUM - Mix of downbeats and upbeats
 * Patterns 8-10: HARD - Complex kick syncopation
 */

export const LESSON_3_PATTERNS = [
  // ===== PATTERN 1: EASY - Classic rock beat (kicks on 1 & 3) =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (1 & 3)
  ], 'eighth', 2, 85, ['rhythmic-anchoring', 'downbeat-identification']),

  // ===== PATTERN 2: EASY - Four-on-the-floor =====
  // Kick on all 4 quarter note beats per measure (8 kicks total)
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],      // KD (all 4 beats both measures)
  ], 'eighth', 2, 81, ['rhythmic-anchoring', 'downbeat-identification']),

  // ===== PATTERN 3: EASY - Kick on beat 1 only =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (1 each measure)
  ], 'eighth', 2, 87, ['rhythmic-anchoring', 'downbeat-identification']),

  // ===== PATTERN 4: MEDIUM - Kick on 1, and-of-2 =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false],      // KD (1, and-of-2)
  ], 'eighth', 2, 84, ['rhythmic-anchoring', 'upbeat-identification']),

  // ===== PATTERN 5: MEDIUM - Kick on 1, 3, and-of-3 =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false],     // KD (1, 3, and-of-3)
  ], 'eighth', 2, 88, ['rhythmic-anchoring', 'upbeat-identification']),

  // ===== PATTERN 6: MEDIUM - Kick on and-of-1, 3 =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // KD (and-of-1, 3)
  ], 'eighth', 2, 83, ['rhythmic-anchoring', 'upbeat-identification']),

  // ===== PATTERN 7: MEDIUM - Kick on 1, and-of-1, and-of-2 =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, true, false, false, false, true, false, false, true, false, false, false, false, false, false, false],      // KD (1, and-of-1, and-of-2)
  ], 'eighth', 2, 86, ['rhythmic-anchoring', 'upbeat-identification', 'syncopation']),

  // ===== PATTERN 8: HARD - Syncopated kick pattern =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, true, false, true, false, false, false, true, false, false, false, true, false, false],       // KD (1, e-of-1, and-of-2, and-of-3, and-of-4)
  ], 'eighth', 2, 82, ['rhythmic-anchoring', 'upbeat-identification', 'syncopation']),

  // ===== PATTERN 9: HARD - Half-time feel =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true],      // KD (1, and-of-1, 3, and-of-4)
  ], 'eighth', 2, 85, ['rhythmic-anchoring', 'syncopation']),

  // ===== PATTERN 10: HARD - Complex pattern with anticipations =====
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],                  // HH (steady 8ths, locked)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (locked on 2 & 4)
    [true, true, false, false, false, true, false, true, false, true, false, true, false, false, false, true],         // KD (complex syncopation)
  ], 'eighth', 2, 89, ['rhythmic-anchoring', 'upbeat-identification', 'syncopation']),
];

/**
 * Complete Lesson 3 definition
 */
export const LESSON_3 = {
  ...LESSON_3_METADATA,
  patterns: LESSON_3_PATTERNS,
};

export default LESSON_3;
