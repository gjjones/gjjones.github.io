import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 5: The Open Hi-Hat "Lift"
 *
 * Learning Goal: Identify open hi-hat placement and understand the "choke" concept
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: Closed hi-hat locked to steady 8ths, Snare locked on beats 2 & 4
 * Focus: Where does the open hi-hat appear and get "choked" by the closed hat?
 */

export const LESSON_5_METADATA = {
  id: 'lesson-5-open-hihat-lift',
  phase: 1,
  lessonNumber: 5,
  title: 'The Open Hi-Hat "Lift"',
  concept: 'Identifying open hi-hat placement and the "choke" effect',
  quality: 'open-hihat-choking',
  description: '16th note grid with closed hi-hat on steady 8ths and snare on beats 2 & 4. Focus on transcribing open hi-hat placements.',
  instruments: ['HH', 'OH', 'SN', 'KD'],
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {
      HH: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],  // Closed hat on all 8th notes
      SN: [4, 12, 20, 28]  // Snare locked on beats 2 & 4
    },
    available: ['OH', 'KD']  // Open hi-hat and kick are editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns identifying where the open hi-hat appears and gets "choked" by the closed hat',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch'],
  nextLessons: ['lesson-6-16th-snare'],

  genreContext: {
    primary: 'Rock, Disco, Funk',
    description: 'The open hi-hat "lift" is a signature element in disco and funk. The "choke" (when the open hat is cut off by the closed hat) creates rhythmic tension and release.',
  }
};

/**
 * Lesson 5 Patterns (15 total: 5 easy, 5 medium, 5 hard)
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 *   - Beat 1: steps 0-3 (0=downbeat, 1=e, 2=and, 3=a)
 *   - Beat 2: steps 4-7 (4=downbeat, 5=e, 6=and, 7=a)
 *   - Beat 3: steps 8-11 (8=downbeat, 9=e, 10=and, 11=a)
 *   - Beat 4: steps 12-15 (12=downbeat, 13=e, 14=and, 15=a)
 * Measure 2: Steps 16-31 (same pattern)
 *
 * Closed hi-hat locked: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30] = all 8th notes
 * Snare locked: [4, 12, 20, 28] = beats 2 & 4
 *
 * EASY (Patterns 1-5): Single open hat placements on obvious positions, tempo 82-87 BPM
 * MEDIUM (Patterns 6-10): Multiple open hats and varied placements, tempo 84-89 BPM
 * HARD (Patterns 11-15): Complex syncopated open hat patterns, tempo 81-86 BPM
 */

export const LESSON_5_PATTERNS = [
  // ===== PATTERN 1: EASY - Open hat on "and" of 2 and 4 =====
  // OH: steps 6, 14 (the "and" of beats 2 and 4)
  // KD: simple four-on-the-floor
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (and-of-2, and-of-4)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (four-on-the-floor)
  ], 'sixteenth', 2, 87, ['open-hihat-choking', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 2: EASY - Open hat on "and" of 1 =====
  // OH: step 2 (the "and" of beat 1)
  // KD: beats 1 and 3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (and-of-1)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (beats 1 & 3)
  ], 'sixteenth', 2, 85, ['open-hihat-choking', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 3: EASY - Open hat on "and" of 3 =====
  // OH: step 10 (the "and" of beat 3)
  // KD: four-on-the-floor
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],   // OH (and-of-3 both measures)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (four-on-the-floor)
  ], 'sixteenth', 2, 82, ['open-hihat-choking', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 4: EASY - Open hat on "and" of 4 only =====
  // OH: step 14 (the "and" of beat 4)
  // KD: beats 1, 3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (and-of-4 measure 1 only)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
  ], 'sixteenth', 2, 86, ['open-hihat-choking', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 5: EASY - Open hat on "and" of 1 and 3 =====
  // OH: steps 2, 10 (and-of-1, and-of-3)
  // KD: four-on-the-floor
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (and-of-1, and-of-3 measure 1 only)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (four-on-the-floor)
  ], 'sixteenth', 2, 84, ['open-hihat-choking', '16th-note-subdivision'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Open hat on multiple "ands" =====
  // OH: steps 2, 10 (and-of-1, and-of-3)
  // KD: beats 1, 3, and-of-2
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false],   // OH (and-of-1, and-of-3 both measures)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-2, 3)
  ], 'sixteenth', 2, 88, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Open hat before backbeat =====
  // OH: steps 3, 11 (the "a" just before beats 2 and 4)
  // KD: four-on-the-floor
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],   // OH (a-of-1, a-of-3 = just before 2 & 4)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (four-on-the-floor)
  ], 'sixteenth', 2, 84, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Open hat on "e" positions =====
  // OH: steps 1, 9 (the "e" after beats 1 and 3)
  // KD: 1, and-of-2, 3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false],   // OH (e-of-1, e-of-3 both measures)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-2, 3)
  ], 'sixteenth', 2, 89, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Multiple open hats per measure =====
  // OH: steps 2, 6, 10 (ands of 1, 2, 3)
  // KD: 1, 3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (and-of-1, and-of-2, and-of-3 in measure 1)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
  ], 'sixteenth', 2, 85, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Open hat on "and" of 2, 4 with syncopated kick =====
  // OH: steps 6, 14, 22 (and-of-2 both measures, and-of-4 measure 2)
  // KD: 1, and-of-1, 3, and-of-3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],   // OH (and-of-2 both measures, and-of-4 measure 2)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, true, false, false, false, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-1, 3, and-of-3)
  ], 'sixteenth', 2, 87, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'medium'),

  // ===== PATTERN 11: HARD - Syncopated open hats =====
  // OH: steps 1, 7, 9 (e-of-1, a-of-2, e-of-3)
  // KD: 1, and-of-1, and-of-2, 3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (e-of-1, a-of-2, e-of-3)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, true, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-1, and-of-2, 3)
  ], 'sixteenth', 2, 81, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Off-beat open hat rhythm =====
  // OH: steps 3, 11, 19 (a-of-1, a-of-3, a-of-1 measure 2)
  // KD: four-on-the-floor
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (a-of-1, a-of-3, a-of-1)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],      // KD (four-on-the-floor)
  ], 'sixteenth', 2, 86, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Complex open hat pattern =====
  // OH: steps 2, 5, 10, 13 (and-of-1, e-of-2, and-of-3, e-of-4)
  // KD: 1, 3, and-of-3
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, false, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (and-of-1, e-of-2, and-of-3, e-of-4)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3, and-of-3)
  ], 'sixteenth', 2, 83, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Dense open hat with complex kick =====
  // OH: steps 1, 3, 9, 11, 17 (e-of-1, a-of-1, e-of-3, a-of-3, e-of-1 measure 2)
  // KD: 1, and-of-2, 3, and-of-4
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (five open hats: e-of-1, a-of-1, e-of-3, a-of-3, e-of-1 measure 2)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-2, 3, and-of-4)
  ], 'sixteenth', 2, 84, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Maximum complexity open hat pattern =====
  // OH: steps 1, 5, 7, 9, 13, 19 (e-of-1, e-of-2, a-of-2, e-of-3, e-of-4, a-of-1 measure 2)
  // KD: 1, and-of-1, and-of-2, 3, and-of-3, and-of-4
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],    // HH (locked 8ths)
    [false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false],   // OH (six open hats with complex syncopation)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (locked beats 2 & 4)
    [true, false, true, false, false, false, true, false, true, false, false, false, false, true, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (six kicks with maximum syncopation)
  ], 'sixteenth', 2, 82, ['open-hihat-choking', '16th-note-subdivision', 'syncopation'], 'hard'),
];

/**
 * Complete Lesson 5 definition
 * Combines metadata and patterns
 */
export const LESSON_5 = {
  ...LESSON_5_METADATA,
  patterns: LESSON_5_PATTERNS,
};

export default LESSON_5;
