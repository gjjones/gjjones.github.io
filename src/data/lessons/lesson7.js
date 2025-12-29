import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 7: The Displaced Backbeat
 *
 * Learning Goal: Identify when the backbeat snare is displaced early or late
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: Beat 2 snare is LOCKED on beats 2 (steps 4, 20)
 * Focus: Beat 4 snare displaced to "e" (early) or "a" (late) positions
 */

export const LESSON_7_METADATA = {
  id: 'lesson-7-displaced-backbeat',
  phase: 3,
  lessonNumber: 7,
  title: 'The Displaced Backbeat',
  concept: 'Identifying early or late backbeat displacement',
  quality: 'backbeat-displacement',
  description: '16th note grid with beat 2 fixed. Focus on transcribing whether beat 4 snare lands early (rushed/swing feel) or late (laid back feel).',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {
      SN: [4, 20]  // Snare locked on beat 2 (both measures)
    },
    available: ['KD']  // Kick and displaced snare are editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 10 patterns distinguishing between normal, early (rushed), and late (laid back) backbeat placement on beat 4',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch', 'lesson-5-open-hihat-lift', 'lesson-6-e-and-a-snare'],
  nextLessons: ['lesson-8-two-bar-phrasing'],

  genreContext: {
    primary: 'Swing, Blues, Funk, Neo-soul',
    description: 'Backbeat displacement creates different rhythmic feels. Early snares create a "rushed" or "swing" feel common in jazz and shuffle grooves. Late snares create a "laid back" or "lazy" feel essential to funk and neo-soul.',
  }
};

/**
 * Lesson 7 Patterns
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 *   - Beat 1: steps 0-3 (0=downbeat, 1=e, 2=and, 3=a)
 *   - Beat 2: steps 4-7 (4=downbeat, 5=e, 6=and, 7=a) - LOCKED
 *   - Beat 3: steps 8-11 (8=downbeat, 9=e, 10=and, 11=a)
 *   - Beat 4: steps 12-15 (12=downbeat, 13=e, 14=and, 15=a)
 * Measure 2: Steps 16-31 (same pattern)
 *
 * Beat 2 locked: [4, 20]
 * Beat 4 displacement options:
 * - Normal: steps 12, 28 (on the beat)
 * - Early: steps 11, 27 (the "a" of beat 3 - rushed/swing feel)
 * - Late: steps 13, 29 (the "e" of beat 4 - laid back feel)
 *
 * Patterns 1-3: EASY (slow tempo 85-90 BPM)
 * - Establish baseline and introduce displacement
 * - Simple kick patterns
 *
 * Patterns 4-7: MEDIUM (mixed tempo 95-105 BPM)
 * - Mix early and late displacements
 * - More complex kick patterns
 *
 * Patterns 8-10: HARD (faster tempo 108-115 BPM)
 * - Complex displacement patterns
 * - Syncopated kicks with displaced backbeat
 */

export const LESSON_7_PATTERNS = [
  // ===== PATTERN 1: EASY - Normal backbeat (baseline) =====
  // Snares: beats 2 & 4 exactly on the beat (steps 4, 12, 20, 28)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2 & 4 on beat)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 82, ['backbeat-displacement', 'backbeat-placement']),

  // ===== PATTERN 2: EASY - Beat 4 early (measure 1) =====
  // Snares: beat 2 on beat (4, 20), beat 4 early (11, 28)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (2, 4 early in m1, 2 & 4 in m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 89, ['backbeat-displacement', 'backbeat-placement']),

  // ===== PATTERN 3: EASY - Beat 4 late (measure 1) =====
  // Snares: beat 2 on beat (4, 20), beat 4 late (13, 28)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (2, 4 late in m1, 2 & 4 in m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 85, ['backbeat-displacement', 'backbeat-placement']),

  // ===== PATTERN 4: MEDIUM - Both measures early =====
  // Snares: beat 2 on beat (4, 20), beat 4 early both measures (11, 27)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2 & 4 early)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 87, ['backbeat-displacement', 'backbeat-placement', 'syncopation']),

  // ===== PATTERN 5: MEDIUM - Both measures late =====
  // Snares: beat 2 on beat (4, 20), beat 4 late both measures (13, 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (2 & 4 late)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 83, ['backbeat-displacement', 'backbeat-placement', 'syncopation']),

  // ===== PATTERN 6: MEDIUM - Mix: M1 early, M2 late =====
  // Snares: beat 2 on beat (4, 20), M1 beat 4 early (11), M2 beat 4 late (29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (mixed)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 86, ['backbeat-displacement', 'backbeat-placement', 'syncopation']),

  // ===== PATTERN 7: MEDIUM - Early with syncopated kick =====
  // Snares: beat 2 & 4 early (4, 11, 20, 27)
  // Kicks: syncopated pattern
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2 & 4 early)
    [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],     // KD (1, and-of-3)
  ], 'sixteenth', 2, 84, ['backbeat-displacement', 'backbeat-placement', 'syncopation']),

  // ===== PATTERN 8: HARD - Late with complex kick pattern =====
  // Snares: beat 2 & 4 late (4, 13, 20, 29)
  // Kicks: more complex syncopation
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (2 & 4 late)
    [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false],       // KD (1, e-of-1, and-of-3, and-of-3)
  ], 'sixteenth', 2, 88, ['backbeat-displacement', '16th-note-subdivision', 'syncopation']),

  // ===== PATTERN 9: HARD - Alternating displacement =====
  // Snares: M1 late, M2 early with varied kicks
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (M1: 2, 4 late; M2: 2, 4 early)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, true, false],       // KD (complex)
  ], 'sixteenth', 2, 85, ['backbeat-displacement', '16th-note-subdivision', 'syncopation']),

  // ===== PATTERN 10: HARD - Maximum complexity =====
  // Snares: Both early with very syncopated kicks
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2 & 4 early)
    [true, true, false, false, false, false, false, true, false, true, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, true, true, false, false, false, true, false],           // KD (very complex)
  ], 'sixteenth', 2, 81, ['backbeat-displacement', '16th-note-subdivision', 'syncopation']),
];

/**
 * Complete Lesson 7 definition
 * Combines metadata and patterns
 */
export const LESSON_7 = {
  ...LESSON_7_METADATA,
  patterns: LESSON_7_PATTERNS,
};

export default LESSON_7;
