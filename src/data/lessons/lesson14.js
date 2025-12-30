import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 14: Two-Bar Mastery
 *
 * Learning Goal: Transcribe complex two-bar phrases requiring extended memory and pattern recognition
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: None - all instruments editable
 * Focus: Extended phrases where each measure is distinct, requiring careful attention to variation
 */

export const LESSON_14_METADATA = {
  id: 'lesson-14-two-bar-mastery',
  phase: 4,
  lessonNumber: 14,
  title: 'Two-Bar Mastery',
  concept: 'Complex extended phrases with measure-to-measure variation',
  quality: 'two-bar-memory',
  description: '16th note grid with no constraints. Focus on transcribing two-bar phrases where measure 1 and measure 2 have distinct patterns, requiring extended musical memory and careful listening.',
  instruments: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // All 7 instruments
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT']  // All instruments editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 two-bar phrases demonstrating extended musical memory and variation recognition',
  prerequisites: ['lesson-13-complete-grooves'],
  nextLessons: [],

  genreContext: {
    primary: 'All Genres - Advanced Musicality',
    description: 'Two-bar phrasing is the hallmark of musical drumming. Great drummers like Questlove, Chris Dave, and Nate Smith create interest through subtle variation across measures. These extended phrases require deep listening, pattern recognition, and musical memory - the final frontier of rhythmic transcription.',
  }
};

/**
 * Lesson 14 Patterns (15 total: 5 easy, 5 medium, 5 hard)
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 * Measure 2: Steps 16-31
 *
 * Instruments (7 total):
 * - Index 0: HH (Closed Hi-Hat)
 * - Index 1: OH (Open Hi-Hat)
 * - Index 2: SN (Snare)
 * - Index 3: KD (Kick)
 * - Index 4: HT (High Tom)
 * - Index 5: MT (Mid Tom)
 * - Index 6: LT (Low Tom)
 *
 * TWO-BAR PRINCIPLE: Measure 1 and Measure 2 must have distinct patterns
 *
 * EASY (Patterns 1-5): Simple variation between measures, tempo 84-88 BPM
 * MEDIUM (Patterns 6-10): More complex variation with fills and accents, tempo 82-87 BPM
 * HARD (Patterns 11-15): Maximum complexity with full variation and integration, tempo 81-86 BPM
 */

export const LESSON_14_PATTERNS = [
  // ===== PATTERN 1: EASY - Simple kick variation =====
  // Same backbeat, different kick pattern each measure
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH (consistent)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4 both measures)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (m1: 1, 3 | m2: 1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['two-bar-memory', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 2: EASY - Fill in measure 2 =====
  // Standard groove, then fill
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false], // HH (stops for fill m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, true, true, true, false, false, false, true],    // SN (2, 4 m1 | 3, 25-28, 31 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (step 28 fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29 fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (step 30 fill)
  ], 'sixteenth', 2, 84, ['two-bar-memory', 'fill-construction'], 'easy'),

  // ===== PATTERN 3: EASY - Open hi-hat in measure 2 =====
  // Closed hi-hats m1, open hi-hats m2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (m1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // OH (m2 quarter notes)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4 both measures)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 88, ['two-bar-memory', 'open-hihat-choking'], 'easy'),

  // ===== PATTERN 4: EASY - Displaced snare in measure 2 =====
  // Standard backbeat m1, displaced backbeat m2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false],    // SN (2, 4 m1 | e-of-2, a-of-4 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['two-bar-memory', 'backbeat-displacement'], 'easy'),

  // ===== PATTERN 5: EASY - Different kick patterns each measure =====
  // Distinct kick placement each measure
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4 both measures)
    [true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // KD (m1: 1, &-of-1, 3 | m2: 1, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['two-bar-memory', 'syncopation'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Ghost notes increase in measure 2 =====
  // Simple ghosts m1, complex ghosts m2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true, true, false, true, false, true, true, false, true, true, false, true, false, true, true],    // SN (m1: simple ghosts | m2: complex ghosts)
    [true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],     // KD (1, a-of-2 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['two-bar-memory', 'ghost-notes'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Groove to fill transition =====
  // Solid groove m1, complex fill m2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false], // HH (stops halfway m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, true, true, false, true, false, true, false, true, true],    // SN (2, 4 m1 | complex fill m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false],     // KD (1, 3, a-of-4 m1 | 1, 3, a-of-3 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],     // HT (step 20)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, true, false, true, false, false],     // MT (steps 21, 25, 27, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 82, ['two-bar-memory', 'fill-construction', 'pattern-completion'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Linear to non-linear transition =====
  // Linear m1, simultaneous hits m2
  createPattern([
    [true, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH (linear m1, steady m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, true, false, false, true, false, false, true, true, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (linear m1 | 2, 4 m2)
    [false, false, false, false, false, true, false, true, false, false, false, true, false, true, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (linear m1 | 1, 3 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['two-bar-memory', 'linear-drumming'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Different syncopation each measure =====
  // Syncopation pattern A m1, pattern B m2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false],    // SN (m1: e-of-2, a-of-4 | m2: a-of-1, 2, a-of-4, 4)
    [true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false],     // KD (m1: 1, &-of-1, 3 | m2: 1, a-of-2, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['two-bar-memory', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Building intensity =====
  // Simple m1, complex m2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, false],    // SN (simple m1 | complex m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false],     // KD (1, 3 m1 | 1, a-of-2, &-of-3 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['two-bar-memory', 'pattern-completion'], 'medium'),

  // ===== PATTERN 11: HARD - Question and answer phrase =====
  // Musical call (m1) and response (m2)
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false], // HH (stops for fills)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false], // OH (accent m2)
    [false, true, false, false, true, false, false, false, false, true, false, false, true, true, true, true, false, true, false, true, true, false, true, false, false, true, false, true, false, true, true, true],    // SN (call with ghosts m1 | answer with different pattern m2)
    [true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false],     // KD (1, a-of-2 m1 | 1, a-of-2, &-of-3 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // HT (step 12 m1)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // MT (step 13 m1)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // LT (steps 14, 15 m1)
  ], 'sixteenth', 2, 81, ['two-bar-memory', 'ghost-notes', 'fill-construction', 'pattern-completion'], 'hard'),

  // ===== PATTERN 12: HARD - Polyrhythmic variation =====
  // 3-feel m1, 4-feel m2
  createPattern([
    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH (3s m1, steady m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (e-of-2, a-of-4 both - but feels different with different HH)
    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (m1: every 3 | m2: 1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['two-bar-memory', 'polyrhythmic-feel', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Complete transformation =====
  // Totally different pattern each measure
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, false, false, false, true, false, true, false, false, false, true, false, false, false], // HH (steady m1, sparse m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false], // OH (m2 only)
    [false, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true],    // SN (m1: ghost notes | m2: different syncopation)
    [true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, true, false],     // KD (m1: 1, a-of-2 | m2: 1, 3, &-of-3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false],     // HT (m2: steps 21, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['two-bar-memory', 'ghost-notes', 'syncopation', 'open-hihat-choking'], 'hard'),

  // ===== PATTERN 14: HARD - Layered complexity =====
  // Each element varies independently
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (steady m1, swung m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true], // OH (m2 only, alternating)
    [false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, false, false, false, false, true, true, false, false, true, false, false, false, true, true, false, false, true],    // SN (m1: ghosts | m2: different syncopation)
    [true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, true, false],     // KD (m1: 1, a-of-2, e-of-3 | m2: 1, 3, &-of-3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['two-bar-memory', 'ghost-notes', 'syncopation', 'open-hihat-choking', 'pattern-completion'], 'hard'),

  // ===== PATTERN 15: HARD - Ultimate two-bar challenge =====
  // Maximum complexity, variation, and musicality
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, true, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false], // HH (m1: steady with fill break | m2: sparse)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // OH (m2: accents on 2, 4)
    [false, true, false, true, true, false, true, false, false, true, false, true, true, true, true, true, false, true, false, true, false, false, false, true, false, true, true, false, false, true, true, true],    // SN (m1: ghosts + fill | m2: different complex pattern + fill)
    [true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false],     // KD (m1: 1, a-of-2, e-of-3 | m2: 1, 3, a-of-3)
    [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],     // HT (fills: step 12 m1, step 21 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // MT (fill: step 13 m1)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // LT (fill: steps 14, 15 m1)
  ], 'sixteenth', 2, 85, ['two-bar-memory', 'ghost-notes', 'syncopation', 'fill-construction', 'open-hihat-choking', 'pattern-completion', 'musicality'], 'hard'),
];

// Export full lesson with metadata and patterns
export const lesson14 = {
  ...LESSON_14_METADATA,
  patterns: LESSON_14_PATTERNS,
  totalQuestions: LESSON_14_PATTERNS.length
};
