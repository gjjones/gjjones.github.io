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
  learningGoal: 'Transcribe 10 patterns identifying subtle ghost notes on "e" and "a" subdivisions between the main backbeat',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch', 'lesson-5-open-hihat-lift'],
  nextLessons: ['lesson-7-displaced-backbeat'],

  genreContext: {
    primary: 'Funk, R&B, Jazz',
    description: 'Ghost notes are the subtle, low-velocity snare hits that create rhythmic texture between the main backbeat. Mastering ghost notes is essential for funk, R&B, and jazz drumming.',
  }
};

/**
 * Lesson 6 Patterns
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
 * Patterns 1-3: EASY (slow tempo 85-90 BPM)
 * - Basic backbeat with simple ghost notes
 * - Single "e" or "a" ghosts
 *
 * Patterns 4-7: MEDIUM (mixed tempo 95-105 BPM)
 * - Multiple ghost notes per measure
 * - Mixing "e" and "a" subdivisions
 *
 * Patterns 8-10: HARD (faster tempo 108-115 BPM)
 * - Complex ghost note patterns
 * - Multiple consecutive ghosts creating double-tap feels
 */

export const LESSON_6_PATTERNS = [
  // ===== PATTERN 1: EASY - Basic backbeat only =====
  // Snares: beats 2 & 4 only (no ghosts yet)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (beats 1 & 3) - LOCKED
  ], 'sixteenth', 2, 88, ['backbeat-placement']),

  // ===== PATTERN 2: EASY - Add one "e" ghost on beat 2 =====
  // Snares: beats 2 & 4, plus "e" of beat 2 (step 5)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false],      // SN (2, 2e, 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 86, ['ghost-notes', 'sixteenth-note-precision']),

  // ===== PATTERN 3: EASY - "e" ghosts on beats 2 & 4 =====
  // Snares: beats 2 & 4, plus "e" of each (steps 5, 13, 21, 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false],        // SN (2e, 4e)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 84, ['ghost-notes', 'sixteenth-note-precision']),

  // ===== PATTERN 4: MEDIUM - Adding "a" ghost on beat 4 =====
  // Snares: beats 2 & 4, plus "a" of beat 4 (steps 15, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true],      // SN (2, 4, 4a)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 81, ['ghost-notes', 'sixteenth-note-precision', 'backbeat-placement']),

  // ===== PATTERN 5: MEDIUM - Mix of "e" and "a" ghosts =====
  // Snares: beats 2 & 4, plus "e" of 2 and "a" of 4
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, true],        // SN (2e, 4a)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 85, ['ghost-notes', 'sixteenth-note-precision', 'syncopation']),

  // ===== PATTERN 6: MEDIUM - Ghost before beat 1 (measure 2) =====
  // Snares: beats 2 & 4, "e" ghosts, plus "a" before beat 1 of measure 2 (step 19)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, true, true, true, false, false, false, false, false, false, true, true, false, false],          // SN (2e, 4e, plus ghost before m2 beat 1)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 83, ['ghost-notes', 'sixteenth-note-precision', 'syncopation']),

  // ===== PATTERN 7: MEDIUM - Double-tap feel =====
  // Snares: beats 2 & 4 with consecutive 16th notes (2e&, 4e&)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false],            // SN (2e&, 4e&)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 87, ['ghost-notes', 'sixteenth-note-precision']),

  // ===== PATTERN 8: HARD - Complex ghost pattern =====
  // Snares: mix of ghosts on multiple subdivisions
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, true, false, false, false, true, true, true, false, false, false, false, false, true, true, true, false, true],              // SN (complex pattern)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 85, ['ghost-notes', 'sixteenth-note-precision', 'syncopation']),

  // ===== PATTERN 9: HARD - Advanced subdivision patterns =====
  // Snares: varied ghosts across all subdivisions
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, true, false, false, true, true, false, true, false, true, false, false, true, true, false, true, false, true, false, false, true, true, false, true, false, true, false, false, true, true, false, true],                // SN (varied)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 89, ['ghost-notes', 'sixteenth-note-precision', 'syncopation']),

  // ===== PATTERN 10: HARD - Maximum complexity ghost notes =====
  // Snares: very complex ghost note pattern with multiple consecutive hits
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, true, true, true, true, true, false, true, false, true, true, true, true, true, false, false, false, true, true, true, true, true, false, true, false, true, true, true, true, true],                      // SN (very complex)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD - LOCKED
  ], 'sixteenth', 2, 82, ['ghost-notes', 'sixteenth-note-precision', 'syncopation']),
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
