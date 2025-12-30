import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 9: Tom Dialogue (The "Call and Response")
 *
 * Learning Goal: Transcribe tom patterns that create "call and response" fills
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: None - all instruments editable
 * Focus: Toms fill the spaces where kick and snare are silent
 */

export const LESSON_9_METADATA = {
  id: 'lesson-9-tom-dialogue',
  phase: 3,
  lessonNumber: 9,
  title: 'Tom Dialogue',
  concept: 'Using toms for call-and-response fills',
  quality: 'tom-fills',
  description: '16th note grid introducing three tom voices (High, Mid, Low). Focus on transcribing simple "High-Low" tom patterns that fill gaps in the groove.',
  instruments: ['HH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // 6 instruments!
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'SN', 'KD', 'HT', 'MT', 'LT']  // All instruments editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns identifying tom fills and "high-low" dialogue patterns',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch', 'lesson-5-open-hihat-lift', 'lesson-6-e-and-a-snare', 'lesson-7-displaced-backbeat', 'lesson-8-two-bar-phrasing'],
  nextLessons: [],  // Final lesson in this phase

  genreContext: {
    primary: 'Rock, Funk, Fusion',
    description: 'Tom fills create melodic movement in drumming. The "high-low" dialogue (toms descending or ascending in pitch) is fundamental to drum fills in all genres. Toms add color and dynamics to breaks and turnarounds.',
  }
};

/**
 * Lesson 9 Patterns (15 total: 5 easy, 5 medium, 5 hard)
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 * Measure 2: Steps 16-31
 *
 * Instruments (6 total):
 * - Index 0: HH (Closed Hi-Hat)
 * - Index 1: SN (Snare)
 * - Index 2: KD (Kick)
 * - Index 3: HT (High Tom)
 * - Index 4: MT (Mid Tom)
 * - Index 5: LT (Low Tom)
 *
 * EASY (Patterns 1-5): Simple groove with single tom hits and basic high-low patterns, tempo 82-86 BPM
 * MEDIUM (Patterns 6-10): Tom fills and more complex dialogues, tempo 81-89 BPM
 * HARD (Patterns 11-15): Complex multi-tom patterns with syncopation, tempo 83-87 BPM
 */

export const LESSON_9_PATTERNS = [
  // ===== PATTERN 1: EASY - Single high tom hit =====
  // Simple backbeat with one high tom on beat 3
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (beats 2 & 4)
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (beat 1)
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // HT (beat 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['tom-fills', 'pattern-completion'], 'easy'),

  // ===== PATTERN 2: EASY - High-Low tom pattern =====
  // Simple groove with high tom then low tom (beat 3)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // HT (beat 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false],     // LT (e-of-3)
  ], 'sixteenth', 2, 82, ['tom-fills', 'pattern-completion'], 'easy'),

  // ===== PATTERN 3: EASY - Tom fill at end =====
  // Basic groove, then tom fill in last 4 steps
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN (no snare on beat 4 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (step 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true],     // LT (steps 30, 31)
  ], 'sixteenth', 2, 86, ['tom-fills', 'pattern-completion'], 'easy'),

  // ===== PATTERN 4: EASY - Single mid tom accent =====
  // Simple backbeat with mid tom on beat 3
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // MT (beat 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['tom-fills', 'pattern-completion'], 'easy'),

  // ===== PATTERN 5: EASY - Low tom only fill =====
  // Basic groove with just low tom in fill
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN (no snare on beat 4 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false],     // LT (steps 28, 30)
  ], 'sixteenth', 2, 83, ['tom-fills', 'pattern-completion'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Tom answers snare =====
  // Snare plays, tom responds
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],     // HT (after snare)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (after snare)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 89, ['tom-fills', 'pattern-completion', '16th-note-subdivision'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Descending tom pattern =====
  // High-Mid-Low tom cascade
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (step 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (step 30)
  ], 'sixteenth', 2, 85, ['tom-fills', 'pattern-completion', '16th-note-subdivision'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Tom dialogue throughout =====
  // Toms scattered through the groove
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],     // HT (and-of-3)
    [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],     // MT (a-of-2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // LT (and-of-4)
  ], 'sixteenth', 2, 88, ['tom-fills', 'pattern-completion', '16th-note-subdivision'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Tom triplet feel =====
  // Three toms in quick succession
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // HT (step 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // LT (step 28)
  ], 'sixteenth', 2, 81, ['tom-fills', 'pattern-completion', '16th-note-subdivision'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Ascending toms with kick =====
  // Low-Mid-High tom pattern with kick accent
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN (no snare beat 4 m2)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false],       // KD (with kick on step 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],     // HT (step 31)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // MT (step 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // LT (step 29)
  ], 'sixteenth', 2, 86, ['tom-fills', 'pattern-completion', '16th-note-subdivision'], 'medium'),

  // ===== PATTERN 11: HARD - Complex tom fills =====
  // Multiple tom fills throughout
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, false, false, false],               // HH (8ths, stops for fill)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],    // SN
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD
    [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, true, false, true, false],     // HT
    [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true],     // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // LT
  ], 'sixteenth', 2, 83, ['tom-fills', 'pattern-completion', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Syncopated tom groove =====
  // Toms integrated into the groove
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false],    // SN (displaced)
    [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false],       // KD
    [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],     // HT
    [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true],       // MT
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // LT
  ], 'sixteenth', 2, 87, ['tom-fills', 'pattern-completion', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Maximum tom complexity =====
  // Dense tom patterns with full dialogue
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, true, true, true],                 // HH (8ths + fill)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false],      // SN (ghost notes)
    [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false],       // KD
    [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, true, false],       // HT
    [false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, true],         // MT
    [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false],     // LT
  ], 'sixteenth', 2, 85, ['tom-fills', 'pattern-completion', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Complex dialogue with all toms active =====
  // Dense pattern with toms interwoven throughout groove
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, true],                 // HH (8ths + turnaround variation)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, false, false],        // SN (ghost notes + turnaround)
    [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false],       // KD (syncopated)
    [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true, false],       // HT (scattered)
    [false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, true, false, false],         // MT (scattered)
    [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true],       // LT (scattered)
  ], 'sixteenth', 2, 84, ['tom-fills', 'pattern-completion', '16th-note-subdivision', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Maximum complexity with all voices =====
  // Most complex pattern with all six instruments active and interplaying
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],                 // HH (steady 8ths throughout)
    [false, true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true, false, true, false],               // SN (complex ghost notes + fill)
    [true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, false, true, false, true],           // KD (syncopated)
    [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],       // HT (syncopated)
    [false, false, false, false, false, false, false, true, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, false],         // MT (syncopated)
    [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],     // LT (sparse accents)
  ], 'sixteenth', 2, 86, ['tom-fills', 'pattern-completion', '16th-note-subdivision', 'syncopation'], 'hard'),
];

/**
 * Complete Lesson 9 definition
 * Combines metadata and patterns
 */
export const LESSON_9 = {
  ...LESSON_9_METADATA,
  patterns: LESSON_9_PATTERNS,
};

export default LESSON_9;
