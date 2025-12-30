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
  learningGoal: 'Transcribe 15 patterns distinguishing between normal, early (rushed), and late (laid back) backbeat placement on beat 4',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch', 'lesson-5-open-hihat-lift', 'lesson-6-e-and-a-snare'],
  nextLessons: ['lesson-8-two-bar-phrasing'],

  genreContext: {
    primary: 'Swing, Blues, Funk, Neo-soul',
    description: 'Backbeat displacement creates different rhythmic feels. Early snares create a "rushed" or "swing" feel common in jazz and shuffle grooves. Late snares create a "laid back" or "lazy" feel essential to funk and neo-soul.',
  }
};

/**
 * Lesson 7 Patterns (15 total: 5 easy, 5 medium, 5 hard)
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
 * EASY (Patterns 1-5): Baseline and simple displacements with basic kicks, tempo 82-89 BPM
 * MEDIUM (Patterns 6-10): Mix of early/late and more complex kicks, tempo 83-87 BPM
 * HARD (Patterns 11-15): Complex displacement with syncopated kicks, tempo 81-88 BPM
 */

export const LESSON_7_PATTERNS = [
  // ===== PATTERN 1: EASY - Normal backbeat (baseline) =====
  // Snares: beats 2 & 4 exactly on the beat (steps 4, 12, 20, 28)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2 & 4 on beat)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 82, ['backbeat-displacement', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 2: EASY - Beat 4 early (measure 1) =====
  // Snares: beat 2 on beat (4, 20), beat 4 early (11, 28)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (2, 4 early in m1, 2 & 4 in m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 89, ['backbeat-displacement', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 3: EASY - Beat 4 late (measure 1) =====
  // Snares: beat 2 on beat (4, 20), beat 4 late (13, 28)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (2, 4 late in m1, 2 & 4 in m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 85, ['backbeat-displacement', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 4: EASY - Beat 4 late (measure 2) =====
  // Snares: beat 2 on beat (4, 20), beat 4 late in measure 2 only (12, 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (2, 4 normal in m1, 2 & 4 late in m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 86, ['backbeat-displacement', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 5: EASY - Beat 4 early (measure 2) =====
  // Snares: beat 2 on beat (4, 20), beat 4 early in measure 2 only (12, 27)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2, 4 normal in m1, 2 & 4 early in m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 84, ['backbeat-displacement', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Both measures early =====
  // Snares: beat 2 on beat (4, 20), beat 4 early both measures (11, 27)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2 & 4 early)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 87, ['backbeat-displacement', 'backbeat-placement', 'syncopation'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Both measures late =====
  // Snares: beat 2 on beat (4, 20), beat 4 late both measures (13, 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (2 & 4 late)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 83, ['backbeat-displacement', 'backbeat-placement', 'syncopation'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Mix: M1 early, M2 late =====
  // Snares: beat 2 on beat (4, 20), M1 beat 4 early (11), M2 beat 4 late (29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (mixed)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 86, ['backbeat-displacement', 'backbeat-placement', 'syncopation'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Early with syncopated kick =====
  // Snares: beat 2 & 4 early (4, 11, 20, 27)
  // Kicks: syncopated pattern
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2 & 4 early)
    [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],     // KD (1, and-of-3)
  ], 'sixteenth', 2, 84, ['backbeat-displacement', 'backbeat-placement', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Mix: M1 late, M2 normal with kicks =====
  // Snares: M1 beat 4 late (13), M2 beat 4 normal (28)
  // Kicks: varied pattern
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (M1 late, M2 normal)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, and-of-2, 3)
  ], 'sixteenth', 2, 85, ['backbeat-displacement', 'backbeat-placement', 'syncopation'], 'medium'),

  // ===== PATTERN 11: HARD - Late with complex kick pattern =====
  // Snares: beat 2 & 4 late (4, 13, 20, 29)
  // Kicks: more complex syncopation
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (2 & 4 late)
    [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false],       // KD (1, e-of-1, and-of-3, and-of-3)
  ], 'sixteenth', 2, 88, ['backbeat-displacement', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Alternating displacement =====
  // Snares: M1 late, M2 early with varied kicks
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (M1: 2, 4 late; M2: 2, 4 early)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, true, false],       // KD (complex)
  ], 'sixteenth', 2, 85, ['backbeat-displacement', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Maximum complexity =====
  // Snares: Both early with very syncopated kicks
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (2 & 4 early)
    [true, true, false, false, false, false, false, true, false, true, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, true, true, false, false, false, true, false],           // KD (very complex)
  ], 'sixteenth', 2, 81, ['backbeat-displacement', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Both late with dense kick pattern =====
  // Snares: beat 2 & 4 late both measures (4, 13, 20, 29)
  // Kicks: dense syncopation with multiple 16th positions
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],     // SN (2 & 4 late)
    [true, false, true, false, false, false, true, false, false, true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, true, false, false, true, false],           // KD (dense pattern)
  ], 'sixteenth', 2, 87, ['backbeat-displacement', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Alternating early/late each measure with complex kicks =====
  // Snares: M1 early & late (4, 11, 13), M2 early (20, 27)
  // Kicks: maximum complexity
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false],     // SN (complex displacement)
    [true, true, false, false, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, false, false, true],           // KD (maximum complexity)
  ], 'sixteenth', 2, 82, ['backbeat-displacement', '16th-note-subdivision', 'syncopation'], 'hard'),
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
