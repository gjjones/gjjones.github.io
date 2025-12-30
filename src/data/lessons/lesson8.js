import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 8: Two-Bar Phrasing (The 32-Step Jump)
 *
 * Learning Goal: Recognize when bars repeat with a "turnaround" at the end
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: None - all instruments editable
 * Focus: Measures 1 and 2 are identical EXCEPT for the last 4 steps (the turnaround)
 */

export const LESSON_8_METADATA = {
  id: 'lesson-8-two-bar-phrasing',
  phase: 3,
  lessonNumber: 8,
  title: 'Two-Bar Phrasing',
  concept: 'Identifying repeating patterns with end-of-phrase turnarounds',
  quality: 'two-bar-memory',
  description: '16th note grid with no locked instruments. Measure 1 and Measure 2 are identical except for the last 4 steps of Measure 2, which contain a "turnaround" or fill.',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'SN', 'KD']  // All instruments editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 two-bar patterns and identify the "turnaround" in the last 4 steps of measure 2',
  prerequisites: ['lesson-1-kick-snare-skeleton', 'lesson-2-the-ands', 'lesson-3-hihat-anchor', 'lesson-4-16th-kick-hitch', 'lesson-5-open-hihat-lift', 'lesson-6-e-and-a-snare', 'lesson-7-displaced-backbeat'],
  nextLessons: ['lesson-9-tom-dialogue'],

  genreContext: {
    primary: 'All genres',
    description: 'Two-bar phrasing is fundamental to music. Drummers often play a repeated pattern for measure 1 and most of measure 2, then add a "turnaround" or "fill" in the last beat to signal the phrase ending and lead back to the start.',
  }
};

/**
 * Lesson 8 Patterns (15 total: 5 easy, 5 medium, 5 hard)
 *
 * Beat mapping for 16th note grid (32 steps total):
 * Measure 1: Steps 0-15
 * Measure 2: Steps 16-31
 *   - Steps 16-27: SAME as steps 0-11 (first 3 beats of measure 1)
 *   - Steps 28-31: DIFFERENT - the "turnaround" (beat 4 of measure 2)
 *
 * Pattern structure:
 * - Steps 0-15: Establish a groove pattern
 * - Steps 16-27: Repeat the first 12 steps (3 beats) of that groove
 * - Steps 28-31: Break the pattern with a turnaround/fill
 *
 * EASY (Patterns 1-5): Simple grooves with clear turnarounds, tempo 83-88 BPM
 * MEDIUM (Patterns 6-10): More complex grooves with multi-instrument turnarounds, tempo 82-89 BPM
 * HARD (Patterns 11-15): Complex grooves with subtle turnarounds, tempo 84-87 BPM
 */

export const LESSON_8_PATTERNS = [
  // ===== PATTERN 1: EASY - Simple backbeat with snare fill =====
  // Groove: Backbeat on 2 & 4, kick on 1 & 3
  // Turnaround: Four 16th note snares (steps 28-31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, true, true],       // SN (backbeat + fill)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3 both measures)
  ], 'sixteenth', 2, 83, ['two-bar-memory', 'pattern-completion'], 'easy'),

  // ===== PATTERN 2: EASY - Kick pattern with kick fill =====
  // Groove: Basic rock beat
  // Turnaround: Rapid kick pattern (steps 28, 30, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (backbeat, normal on beat 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, true, true],       // KD (1 & 3 + fill)
  ], 'sixteenth', 2, 85, ['two-bar-memory', 'pattern-completion'], 'easy'),

  // ===== PATTERN 3: EASY - Snare on "and" turnaround =====
  // Groove: Backbeat
  // Turnaround: Snares on "and" and "a" (steps 30, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, true],       // SN (backbeat + turnaround)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 88, ['two-bar-memory', 'pattern-completion'], 'easy'),

  // ===== PATTERN 4: EASY - Kick only turnaround =====
  // Groove: Basic backbeat
  // Turnaround: Single kick on "e" of beat 4 (step 29)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (backbeat)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false],       // KD (1 & 3 + simple turnaround)
  ], 'sixteenth', 2, 86, ['two-bar-memory', 'pattern-completion'], 'easy'),

  // ===== PATTERN 5: EASY - Snare triplet feel turnaround =====
  // Groove: Simple rock beat
  // Turnaround: Three snares (steps 28, 29, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, true],       // SN (backbeat + turnaround)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 84, ['two-bar-memory', 'pattern-completion'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Syncopated groove with fill =====
  // Groove: Kicks on "and" beats
  // Turnaround: Snare triplet feel (steps 28, 29, 30, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, true, true],       // SN (backbeat + fill)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false],       // KD (syncopated)
  ], 'sixteenth', 2, 84, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Hi-hat variation turnaround =====
  // Groove: Steady 8th hats with backbeat
  // Turnaround: Hi-hat breaks pattern (steps 28-31)
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, false, false, false],               // HH (8ths, stops at turnaround)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (backbeat)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 86, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Double kick turnaround =====
  // Groove: Standard rock pattern
  // Turnaround: Double kick on "e" and "and" (steps 29, 30)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],     // SN (backbeat)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, true, false],       // KD (1 & 3 + turnaround)
  ], 'sixteenth', 2, 82, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Snare and kick combination fill =====
  // Groove: Funky pattern with ghost notes
  // Turnaround: Snare-kick alternation (steps 28-31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, true, false],         // SN (ghost notes + turnaround)
    [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, true, false, true],       // KD (syncopated + turnaround)
  ], 'sixteenth', 2, 89, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Hi-hat and snare fill =====
  // Groove: Backbeat with ghost notes
  // Turnaround: Hi-hat and snare combination (steps 28-31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false],     // HH (turnaround only)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, false, true],           // SN (ghost notes + turnaround)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1 & 3)
  ], 'sixteenth', 2, 87, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'medium'),

  // ===== PATTERN 11: HARD - Complex groove with subtle fill =====
  // Groove: 16th note kick variations
  // Turnaround: Subtle snare variation (steps 29, 31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HH (empty)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, true, false, true],       // SN (backbeat + subtle fill)
    [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false],       // KD (complex)
  ], 'sixteenth', 2, 87, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'hard'),

  // ===== PATTERN 12: HARD - Displaced backbeat with fill =====
  // Groove: Laid back snare
  // Turnaround: All three instruments (steps 28-31)
  createPattern([
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],     // HH (turnaround only)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false],       // SN (laid back + turnaround)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, true],       // KD (1 & 3 + turnaround)
  ], 'sixteenth', 2, 84, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Maximum complexity =====
  // Groove: Complex syncopated pattern
  // Turnaround: Dense fill (all instruments, steps 28-31)
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, true, false, true],                 // HH (8ths + turnaround)
    [false, false, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, true, false, false, true, true, true, true],             // SN (complex + fill)
    [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, true, false, true],         // KD (syncopated + turnaround)
  ], 'sixteenth', 2, 85, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'hard'),

  // ===== PATTERN 14: HARD - Syncopated groove with complex multi-instrument fill =====
  // Groove: Off-beat kicks with ghost notes
  // Turnaround: All instruments active with complex interplay (steps 28-31)
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, true, false],                 // HH (8ths + turnaround variation)
    [false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, true, true],           // SN (ghost notes + dense turnaround)
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false, false, true],         // KD (syncopated + turnaround)
  ], 'sixteenth', 2, 86, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Complex phrasing with subtle turnaround change =====
  // Groove: Dense pattern with all three instruments
  // Turnaround: Subtle variation on beat 4 that changes the phrase
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, true],                 // HH (8ths, subtle turnaround)
    [false, true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, false, true, true, true],               // SN (complex ghost notes + turnaround)
    [true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, false, true, false, true],         // KD (syncopated + turnaround)
  ], 'sixteenth', 2, 85, ['two-bar-memory', 'pattern-completion', 'syncopation'], 'hard'),
];

/**
 * Complete Lesson 8 definition
 * Combines metadata and patterns
 */
export const LESSON_8 = {
  ...LESSON_8_METADATA,
  patterns: LESSON_8_PATTERNS,
};

export default LESSON_8;
