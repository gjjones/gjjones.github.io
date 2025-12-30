import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 11: Advanced Fills & Turnarounds
 *
 * Learning Goal: Transcribe multi-tom fills that connect phrases and lead back to the groove
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: None - all instruments editable
 * Focus: Complex fills using all toms (HT, MT, LT) that create melodic movement and dynamic transitions
 */

export const LESSON_11_METADATA = {
  id: 'lesson-11-advanced-fills',
  phase: 4,
  lessonNumber: 11,
  title: 'Advanced Fills & Turnarounds',
  concept: 'Multi-tom fills connecting phrases and creating transitions',
  quality: 'fill-construction',
  description: '16th note grid with no constraints. Focus on transcribing drum fills that use multiple tom voices to create melodic phrases and lead back to the downbeat.',
  instruments: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // All 7 instruments
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT']  // All instruments editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns identifying advanced drum fills, tom combinations, and turnaround timing',
  prerequisites: ['lesson-10-advanced-syncopation'],
  nextLessons: [],

  genreContext: {
    primary: 'Rock, Fusion, Progressive',
    description: 'Advanced fills are the punctuation marks of drumming. Multi-tom fills create melodic movement and dynamic transitions. Masters like Neil Peart, Terry Bozzio, and Simon Phillips use complex fill patterns to add musical interest and mark section changes.',
  }
};

/**
 * Lesson 11 Patterns (15 total: 5 easy, 5 medium, 5 hard)
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
 * EASY (Patterns 1-5): Simple fills at phrase ends, tempo 84-88 BPM
 * MEDIUM (Patterns 6-10): Multi-tom fills with varied rhythms, tempo 82-87 BPM
 * HARD (Patterns 11-15): Complex fills with syncopation and kick integration, tempo 81-86 BPM
 */

export const LESSON_11_PATTERNS = [
  // ===== PATTERN 1: EASY - Simple descending fill at end =====
  // Groove for 7/8 of pattern, then HT-MT-LT-SN at the end
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false], // HH (stops for fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true],    // SN (2, 4, last step)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (step 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (step 30)
  ], 'sixteenth', 2, 86, ['fill-construction', 'tom-fills'], 'easy'),

  // ===== PATTERN 2: EASY - Four-stroke fill (HT-HT-MT-LT) =====
  // Simple repetitive pattern on toms at end of measure 2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN (2, 4 - no snare on beat 4 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false],     // HT (steps 28, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // MT (step 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],     // LT (step 31)
  ], 'sixteenth', 2, 84, ['fill-construction', 'tom-fills'], 'easy'),

  // ===== PATTERN 3: EASY - Two-tom dialogue (HT-LT alternating) =====
  // Simple high-low pattern in last measure
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH (stops early m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN (2, 4 - no snare on beat 4 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (1, 3 m1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false, true, false],     // HT (steps 24, 26, 28, 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false, true],     // LT (steps 25, 27, 29, 31)
  ], 'sixteenth', 2, 88, ['fill-construction', 'tom-fills'], 'easy'),

  // ===== PATTERN 4: EASY - Snare-to-tom fill =====
  // Snare rolls into tom descent
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false], // HH (stops for fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false],    // SN (2, 4, steps 26, 27)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (step 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true],     // LT (steps 30, 31)
  ], 'sixteenth', 2, 85, ['fill-construction', 'tom-fills'], 'easy'),

  // ===== PATTERN 5: EASY - Ascending fill (LT-MT-HT-SN) =====
  // Upward melodic movement
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true],    // SN (2, 4, last step)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // HT (step 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // LT (step 28)
  ], 'sixteenth', 2, 87, ['fill-construction', 'tom-fills'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Triplet-feel fill (HT-MT-LT groups) =====
  // Three-note groups creating triplet feel
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true],    // SN (2, 4, last)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, true, false],     // HT (steps 24, 27, 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, false],     // MT (steps 25, 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false],     // LT (steps 26, 29)
  ], 'sixteenth', 2, 84, ['fill-construction', 'tom-fills'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Syncopated fill with kicks =====
  // Fill includes kick drum hits for complexity
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, true],    // SN (2, 4, step 27, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, true, false],     // KD (1, 3 both + steps 28, 30 in fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false],     // HT (step 25)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],     // MT (step 26)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // LT (step 29)
  ], 'sixteenth', 2, 82, ['fill-construction', 'tom-fills', 'syncopation'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Two-measure build-up fill =====
  // Fill starts in measure 1 and builds through measure 2
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (stops at beat 4 m1)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, false, true],    // SN (beat 2, then accels: steps 14-15, 18-19, 22-23, 26-27, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, false, false],     // HT (steps 12, 17, 21, 25, 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (steps 13, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (step 30)
  ], 'sixteenth', 2, 87, ['fill-construction', 'tom-fills', 'pattern-completion'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Alternating hands fill (R-L pattern) =====
  // Linear fill alternating between snare and toms
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, true, false, true, false, true, false],    // SN (2, 4, then R hand: 24, 26, 28, 30)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false],     // HT (L hand: step 25)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false],     // MT (L hand: step 27)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true],     // LT (L hand: steps 29, 31)
  ], 'sixteenth', 2, 85, ['fill-construction', 'tom-fills', 'linear-drumming'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Open hi-hat accent fill =====
  // Fill with open hi-hat splashes for color
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false], // OH (steps 24, 28 for accents)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, true],    // SN (2, 4, steps 27, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false],     // HT (step 25)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false],     // MT (steps 26, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (step 30)
  ], 'sixteenth', 2, 83, ['fill-construction', 'tom-fills', 'open-hihat-choking'], 'medium'),

  // ===== PATTERN 11: HARD - Complex paradiddle fill =====
  // Sticking pattern (RLRR LRLL) creates complex tom orchestration
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, true, false, true, false, true, false, true, true],    // SN (2, 4, then paradiddle Rs: 20, 22, 24, 26, 28, 30, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (1, 3 m1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],     // HT (L: step 21)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false, true, false, false],     // MT (L: steps 23, 25, 27, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 81, ['fill-construction', 'tom-fills', 'sixteenth-note-precision'], 'hard'),

  // ===== PATTERN 12: HARD - Double-stroke fill (RRLL pattern) =====
  // Fast doubles across all toms
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true],    // SN (2, 4, last)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (1, 3 m1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false],     // HT (RR: steps 22, 23)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, true, true, false, false],     // MT (LL RR: steps 24, 25, 28, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, true, false],     // LT (LL L: steps 26, 27, 30)
  ], 'sixteenth', 2, 84, ['fill-construction', 'tom-fills', 'sixteenth-note-precision'], 'hard'),

  // ===== PATTERN 13: HARD - Polyrhythmic fill (3 over 4) =====
  // Tom fill in groups of 3 against the pulse
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],    // SN (2, 4 m1, last step)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (1, 3 m1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false],     // HT (every 3: steps 20, 23, 26, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, true, false, false, true, false],     // MT (every 3: steps 21, 24, 27, 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, true, false, false, false],     // LT (every 3: steps 22, 25, 28)
  ], 'sixteenth', 2, 86, ['fill-construction', 'tom-fills', 'polyrhythmic-feel'], 'hard'),

  // ===== PATTERN 14: HARD - Flam fill with accent pattern =====
  // Flams on toms (two notes close together) creating texture
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, true, false, true, false, true],    // SN (2, 4, then accents: 25, 27, 29, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false],     // HT (flam notes: 26, 28, 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // MT (grace note: 24)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['fill-construction', 'tom-fills', 'sixteenth-note-precision'], 'hard'),

  // ===== PATTERN 15: HARD - Complete orchestral fill =====
  // All 7 instruments used in complex fill pattern
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false], // HH (stops for fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false], // OH (accents: steps 20, 26)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, true, false, false, false, true, false, true, true],    // SN (2, 4, then: 22, 24, 28, 30, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],     // HT (step 21)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false, false, false, false],     // MT (steps 23, 25, 27)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // LT (step 29)
  ], 'sixteenth', 2, 85, ['fill-construction', 'tom-fills', 'pattern-completion', 'open-hihat-choking'], 'hard'),
];

// Export full lesson with metadata and patterns
export const lesson11 = {
  ...LESSON_11_METADATA,
  patterns: LESSON_11_PATTERNS,
  totalQuestions: LESSON_11_PATTERNS.length
};
