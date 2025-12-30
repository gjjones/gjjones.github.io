import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 4: The 16th Note Kick "Hitch"
 *
 * Learning Goal: Distinguish between kicks on adjacent 16th notes (e.g., step 0 vs step 1)
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: Snare is LOCKED on beats 2 & 4 (steps 4, 12, 20, 28)
 * Focus: Kicks on 16th notes immediately before/after main beats ("hitches")
 */

export const LESSON_4_METADATA = {
  id: 'lesson-4-16th-kick-hitch',
  phase: 2,
  lessonNumber: 4,
  title: 'The 16th Note Kick "Hitch"',
  concept: 'Identifying kick "hitches" on 16th note subdivisions',
  quality: '16th-note-subdivision',
  description: '16th note grid with snare fixed on beats 2 & 4. Focus on transcribing kick "hitches" before or after main beats.',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {
      SN: [4, 12, 20, 28]  // Snare locked on beats 2 & 4 (steps 4, 12, 20, 28)
    },
    available: ['KD']  // Only kick drum is editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns distinguishing kicks on adjacent 16th notes (before/after main beats)',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor'],
  nextLessons: ['lesson-5-open-hihat-lift'],

  genreContext: {
    primary: 'Hip-hop, R&B, Neo-soul',
    description: 'The "hitch" or "shuffle" kick creates rhythmic tension by landing just before or after the expected downbeat. This micro-timing is fundamental to hip-hop and R&B grooves.',
  }
};

/**
 * Lesson 4 Patterns
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 *   - Beat 1: steps 0-3 (0=downbeat, 1=e, 2=and, 3=a)
 *   - Beat 2: steps 4-7 (4=downbeat, 5=e, 6=and, 7=a)
 *   - Beat 3: steps 8-11 (8=downbeat, 9=e, 10=and, 11=a)
 *   - Beat 4: steps 12-15 (12=downbeat, 13=e, 14=and, 15=a)
 * Measure 2: Steps 16-31 (same pattern)
 *
 * Snare locked: [4, 12, 20, 28] = beats 2 & 4
 *
 * EASY (Patterns 1-5): Simple hitches, tempo 82-89 BPM
 * - Kick just before or after downbeat
 * - Clear, unambiguous placements
 *
 * MEDIUM (Patterns 6-10): Complex hitch patterns, tempo 82-87 BPM
 * - Multiple hitches per measure
 * - Mix of early/late placements
 *
 * HARD (Patterns 11-15): Syncopated hitches, tempo 82-88 BPM
 * - Complex syncopated hitches
 * - Combinations of early/late with rapid doubles
 */

export const LESSON_4_PATTERNS = [
  // ===== PATTERN 1: EASY - Kick on beat 1, hitch before beat 3 =====
  // Kicks: step 0 (beat 1), step 7 (the "a" of 2 - just before beat 3)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // KD (beat 1, a-of-2)
  ], 'sixteenth', 2, 86, ['16th-note-subdivision', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 2: EASY - Kick on beat 1, hitch after beat 1 =====
  // Kicks: step 0 (beat 1), step 1 (the "e" of 1 - just after beat 1)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // KD (beat 1, e-of-1)
  ], 'sixteenth', 2, 84, ['16th-note-subdivision', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 3: EASY - Classic with one hitch =====
  // Kicks: step 0 (beat 1), step 8 (beat 3), step 23 (the "a" of beat 2 in measure 2)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],    // KD (1, 3, a-of-2)
  ], 'sixteenth', 2, 89, ['16th-note-subdivision', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 4: EASY - Kick on 1 with e-of-3 hitch =====
  // Kicks: step 0 (beat 1), step 9 (e-of-3)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // KD (1, e-of-3)
  ], 'sixteenth', 2, 82, ['16th-note-subdivision', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 5: EASY - Kick on 3 with a-of-4 hitch =====
  // Kicks: step 8 (beat 3), step 15 (a-of-4)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // KD (3, a-of-4)
  ], 'sixteenth', 2, 88, ['16th-note-subdivision', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Kicks with multiple hitches =====
  // Kicks: step 0, step 1 (e-of-1), step 9 (e-of-3), step 16 (beat 1 measure 2)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (1, e-of-1, e-of-3, 1)
  ], 'sixteenth', 2, 85, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'medium'),

  // ===== PATTERN 7: MEDIUM - "And" kicks with hitches =====
  // Kicks: step 2 (and-of-1), step 6 (and-of-2), step 10 (and-of-3), step 11 (a-of-3)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [false, false, true, false, false, false, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],      // KD (and-of-1, and-of-2, and-of-3, a-of-3)
  ], 'sixteenth', 2, 82, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Early kick pattern =====
  // All kicks land just before the beat (on the "a" of the previous beat)
  // Kicks: step 15 (a-of-4 = just before beat 1 of measure 2), step 23 (a-of-2), step 31 (a-of-4)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true],     // KD (a-of-4, a-of-2, a-of-4)
  ], 'sixteenth', 2, 87, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Late kick pattern =====
  // Kicks land just after the beat (on the "e")
  // Kicks: step 1 (e-of-1), step 9 (e-of-3), step 17 (e-of-1 measure 2)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (e-of-1, e-of-3, e-of-1)
  ], 'sixteenth', 2, 83, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Four hitches with downbeats =====
  // Kicks: step 0, 1, 8, 9, 17
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],      // KD (1, e-of-1, 3, e-of-3, e-of-1 m2)
  ], 'sixteenth', 2, 86, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'medium'),

  // ===== PATTERN 11: HARD - Complex hitch combination =====
  // Mix of early and late kicks with downbeats
  // Kicks: step 0 (beat 1), step 1 (e-of-1), step 7 (a-of-2), step 8 (beat 3), step 16 (beat 1 m2)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],      // KD (1, e-of-1, a-of-2, 3, 1)
  ], 'sixteenth', 2, 88, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Syncopated shuffle =====
  // Multiple hitches creating a shuffled feel
  // Kicks: step 1 (e-of-1), step 5 (e-of-2), step 9 (e-of-3), step 13 (e-of-4), step 18 (and-of-1 m2)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],      // KD (e-of-1, e-of-2, e-of-3, e-of-4, and-of-1)
  ], 'sixteenth', 2, 84, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Advanced hitch pattern =====
  // Complex mix with rapid double kicks
  // Kicks: step 0, 1 (1 and e-of-1), step 7 (a-of-2), step 16, 17 (1 and e-of-1 m2), step 26 (and-of-3 m2)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false],       // KD (1, e-of-1, a-of-2, 1, e-of-1, and-of-3)
  ], 'sixteenth', 2, 86, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Dense hitch pattern =====
  // Seven kicks with complex hitches
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [true, true, false, false, false, true, false, true, false, true, false, false, false, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],         // KD (seven kicks: 1, e-of-1, e-of-2, a-of-2, e-of-3, e-of-4, 1 m2, e-of-1 m2)
  ], 'sixteenth', 2, 82, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Maximum complexity =====
  // Eight kicks with maximum syncopation
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked on beats 2 & 4)
    [false, true, false, true, false, true, false, true, true, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, false, false, false, false, false, false, false],            // KD (eight kicks maximum syncopation)
  ], 'sixteenth', 2, 87, ['16th-note-subdivision', 'kick-drum-precision', 'syncopation'], 'hard'),
];

/**
 * Complete Lesson 4 definition
 * Combines metadata and patterns
 */
export const LESSON_4 = {
  ...LESSON_4_METADATA,
  patterns: LESSON_4_PATTERNS,
};

export default LESSON_4;
