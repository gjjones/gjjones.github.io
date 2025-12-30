import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 6: The "e" and "a" Snare
 *
 * Learning Goal: Transcribe snare ghost notes on 16th note subdivisions ("e" and "a")
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: Kick is LOCKED on beats 1 & 3 (steps 0, 8, 16, 24)
 * Focus: Identifying subtle ghost notes between the main backbeat snares
 */

export const LESSON_6_METADATA = {
  id: 'lesson-6-e-and-a-snare',
  phase: 2,
  lessonNumber: 6,
  title: 'The "e" and "a" Snare',
  concept: 'Transcribing snare ghost notes on 16th note subdivisions',
  quality: '16th-note-ghost-notes',
  description: '16th note grid with kick fixed on beats 1 & 3. Focus on transcribing subtle snare ghost notes on the "e" and "a" subdivisions.',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {
      KD: [0, 8, 16, 24]  // Kick locked on beats 1 & 3
    },
    available: ['SN']  // Only snare is editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns identifying subtle ghost notes on "e" and "a" subdivisions between the main backbeat',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch', 'lesson-5-open-hihat-lift'],
  nextLessons: ['lesson-7-displaced-backbeat'],

  genreContext: {
    primary: 'Funk, R&B, Jazz',
    description: 'Ghost notes are the subtle, low-velocity snare hits that create rhythmic texture between the main backbeat. Mastering ghost notes is essential for funk, R&B, and jazz drumming.',
  }
};

/**
 * Lesson 6 Patterns (15 total: 5 easy, 5 medium, 5 hard)
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 *   - Beat 1: steps 0-3 (0=downbeat, 1=e, 2=and, 3=a)
 *   - Beat 2: steps 4-7 (4=downbeat, 5=e, 6=and, 7=a)
 *   - Beat 3: steps 8-11 (8=downbeat, 9=e, 10=and, 11=a)
 *   - Beat 4: steps 12-15 (12=downbeat, 13=e, 14=and, 15=a)
 * Measure 2: Steps 16-31 (same pattern)
 *
 * Kick locked: [0, 8, 16, 24] = beats 1 & 3
 *
 * EASY (Patterns 1-5): Basic backbeat with simple ghost notes, tempo 84-88 BPM
 * MEDIUM (Patterns 6-10): Multiple ghost notes and varied subdivisions, tempo 81-87 BPM
 * HARD (Patterns 11-15): Complex ghost note patterns with double-taps, tempo 82-89 BPM
 */

export const LESSON_6_PATTERNS = [
  // ===== PATTERN 1: EASY - Basic backbeat only =====
  // Snares: beats 2 & 4 only (no ghosts yet)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (beats 1 & 3) - LOCKED
  ], 'sixteenth', 2, 88, ['backbeat-placement'], 'easy'),

  // ===== PATTERN 2: EASY - Add one "e" ghost on beat 2 =====
  // Snares: beats 2 & 4, plus "e" of beat 2 (step 5)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false],      // SN (2, 2e, 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 86, ['16th-note-ghost-notes', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 3: EASY - "e" ghosts on beats 2 & 4 =====
  // Snares: beats 2 & 4, plus "e" of each (steps 5, 13, 21, 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false],        // SN (2e, 4e)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 84, ['16th-note-ghost-notes', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 4: EASY - Single "a" ghost on beat 4 =====
  // Snares: beats 2 & 4, plus "a" of beat 4 (step 15, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true],      // SN (2, 4, 4a)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 87, ['16th-note-ghost-notes', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 5: EASY - "e" ghost on beat 4 only =====
  // Snares: beats 2 & 4, plus "e" of beat 4 (steps 13, 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, false],      // SN (2, 4e)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 85, ['16th-note-ghost-notes', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Mix of "e" and "a" ghosts =====
  // Snares: beats 2 & 4, plus "e" of 2 and "a" of 4
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, true],        // SN (2e, 4a)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 85, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Ghost before beat 1 (measure 2) =====
  // Snares: beats 2 & 4, "e" ghosts, plus "a" before beat 1 of measure 2 (step 19)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, true, true, true, false, false, false, false, false, false, true, true, false, false],          // SN (2e, 4e, plus ghost before m2 beat 1)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 83, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Double-tap feel =====
  // Snares: beats 2 & 4 with consecutive 16th notes (2e&, 4e&)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false],            // SN (2e&, 4e&)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 87, ['16th-note-ghost-notes', '16th-note-subdivision'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Ghosts on beat 1 and 3 "e" positions =====
  // Snares: beats 2 & 4, plus "e" of beats 1 & 3 (steps 1, 9, 17, 25)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false],          // SN (1e, 2, 3e, 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 81, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - "a" positions before backbeat =====
  // Snares: beats 2 & 4, plus "a" of beat 1 and 3 (steps 3, 11, 19, 27)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false],          // SN (1a, 2, 3a, 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 84, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 11: HARD - Complex ghost pattern =====
  // Snares: mix of ghosts on multiple subdivisions
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, true, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, true],              // SN (complex pattern)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 85, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Advanced subdivision patterns =====
  // Snares: varied ghosts across all subdivisions
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, true, false, false, true, true, false, true, false, true, false, false, true, true, false, true, false, true, false, false, true, true, false, true, false, true, false, false, true, true, false, true],                // SN (varied)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 89, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Maximum complexity ghost notes =====
  // Snares: very complex ghost note pattern with multiple consecutive hits
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, true, true, true, true, true, false, true, false, true, true, true, true, true, false, false, false, true, true, true, true, true, false, true, false, true, true, true, true, true],                      // SN (very complex)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 82, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Dense ghost pattern with varied rhythms =====
  // Snares: complex pattern alternating between e, &, and a positions
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, true, false, true, true, true, true, false, false, true, false, true, true, true, true, false, false, true, false, true, true, true, true, false, false, true, false, true, true, true, true, false],                    // SN (dense pattern across all positions)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 86, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Maximum density with all subdivisions =====
  // Snares: ghost notes on nearly every subdivision creating extreme density
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true],                            // SN (maximum density)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 83, ['16th-note-ghost-notes', '16th-note-subdivision', 'syncopation'], 'hard'),
];

/**
 * Complete Lesson 6 definition
 * Combines metadata and patterns
 */
export const LESSON_6 = {
  ...LESSON_6_METADATA,
  patterns: LESSON_6_PATTERNS,
};

export default LESSON_6;
