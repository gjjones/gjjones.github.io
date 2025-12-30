import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 10: Advanced Syncopation
 *
 * Learning Goal: Identify complex kick/snare displacement patterns that challenge the downbeat
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: None - all instruments editable
 * Focus: Syncopated patterns where kicks and snares land on unexpected subdivisions
 */

export const LESSON_10_METADATA = {
  id: 'lesson-10-advanced-syncopation',
  phase: 4,
  lessonNumber: 10,
  title: 'Advanced Syncopation',
  concept: 'Complex kick/snare patterns that break downbeat expectations',
  quality: 'advanced-syncopation',
  description: '16th note grid with no constraints. Focus on transcribing heavily syncopated patterns where kick and snare placements create polyrhythmic feels and displaced accents.',
  instruments: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // All 7 instruments
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT']  // All instruments editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 patterns identifying advanced syncopation, displaced accents, and polyrhythmic feels',
  prerequisites: ['lesson-9-tom-dialogue'],
  nextLessons: [],

  genreContext: {
    primary: 'Funk, Jazz, Fusion, Progressive Rock',
    description: 'Advanced syncopation creates tension and groove complexity. These patterns are common in funk (James Brown, Meters), jazz fusion (Tony Williams), and progressive rock (Gavin Harrison). Mastering these rhythms develops deep groove awareness.',
  }
};

/**
 * Lesson 10 Patterns (15 total: 5 easy, 5 medium, 5 hard)
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
 * EASY (Patterns 1-5): Moderate syncopation with clear hi-hat anchor, tempo 84-88 BPM
 * MEDIUM (Patterns 6-10): More complex syncopation with multiple displaced accents, tempo 82-87 BPM
 * HARD (Patterns 11-15): Heavy syncopation with polyrhythmic feels and ghost notes, tempo 81-86 BPM
 */

export const LESSON_10_PATTERNS = [
  // ===== PATTERN 1: EASY - Syncopated kick with steady hi-hat =====
  // Basic syncopation: kick on "e" of beat 2, steady 16th hi-hats
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH (steady 16ths)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (beats 2 & 4)
    [true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false],     // KD (1, e-of-2, 3 in both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['advanced-syncopation', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 2: EASY - Backbeat with syncopated kick =====
  // Kick on "and" of beat 1, standard backbeat
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN
    [true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, &-of-1, 3 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['advanced-syncopation', 'kick-drum-precision'], 'easy'),

  // ===== PATTERN 3: EASY - Displaced snare with steady kick =====
  // Snare on "a" of beat 1 and normal beat 4
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false],    // SN (a-of-1, 4 both measures)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 88, ['advanced-syncopation', 'backbeat-displacement'], 'easy'),

  // ===== PATTERN 4: EASY - Open hi-hat syncopation =====
  // Open hi-hat on unexpected beats with basic groove
  createPattern([
    [true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true], // HH (most beats)
    [false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false], // OH (beat 2 both measures)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['advanced-syncopation', 'open-hihat-choking'], 'easy'),

  // ===== PATTERN 5: EASY - Three-against-four feel =====
  // Kick every 3 16ths creates polyrhythmic tension
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],     // KD (every 3 steps: 0,3,6,9,12,15, then 16,19,22,25,28,31)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['advanced-syncopation', 'polyrhythmic-feel'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Funk syncopation with ghost notes =====
  // Mix of syncopated kicks and light ghost note snares
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, true, false, false, true, false, false, false, false, true, false, false, false, false, true, false, false, true, false, false, true, false, false, false, false, true, false, false, false],    // SN (ghost notes on e-of-1, 2, a-of-2, 4 - pattern repeats)
    [true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],     // KD (1, a-of-2 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['advanced-syncopation', 'ghost-notes'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Displaced backbeat with tom accents =====
  // Snare displacement plus tom fills
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false],    // SN (e-of-2, a-of-4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (beat 4 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (a-of-4 both measures)
  ], 'sixteenth', 2, 82, ['advanced-syncopation', 'backbeat-displacement', 'tom-fills'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Complex kick syncopation =====
  // Multiple displaced kicks with standard backbeat
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, true, false, false, false, false, true, false, false, false, true, false, false, false, false, true, false, true, false, false, false, false, true, false, false, false, true, false, false, false, false],     // KD (1, &-of-1, a-of-2, e-of-3 pattern)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['advanced-syncopation', 'kick-drum-precision'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Syncopated open hi-hats =====
  // Open hi-hats create polyrhythmic accents
  createPattern([
    [true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, true], // HH (gaps for OH)
    [false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false], // OH (2, a-of-2)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false],     // KD (1, 3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['advanced-syncopation', 'open-hihat-choking'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Two-bar syncopated phrase =====
  // Different syncopation in each measure
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, true, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, true, false, false, false],    // SN (a-of-1, 2, 4 m1 / 3, a-of-4, 4 m2)
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false],     // KD (1, a-of-2, 3 m1 / 1, 3, &-of-3 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['advanced-syncopation', 'two-bar-memory'], 'medium'),

  // ===== PATTERN 11: HARD - Heavily syncopated groove with ghost notes =====
  // Complex pattern with displaced accents and dynamic variation
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, true, true, false, true, false, false, true, false, false, false, true, false, true, false, true, false, true, true, false, true, false, false, true, false, false, false, true, false, true],    // SN (ghost notes and accents: e-of-1, a-of-1, 2, e-of-2, e-of-3, a-of-4, a-of-4)
    [true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false],     // KD (1, a-of-2, e-of-3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 81, ['advanced-syncopation', 'ghost-notes', 'sixteenth-note-precision'], 'hard'),

  // ===== PATTERN 12: HARD - Linear syncopation =====
  // No simultaneous hits, complex interplay
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (16th pattern with gaps)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, true],    // SN (e-of-1, a-of-2, e-of-3, a-of-4)
    [false, false, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false, true, false, false, false, true, false, false],     // KD (a-of-1, e-of-2, e-of-3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['advanced-syncopation', 'linear-drumming'], 'hard'),

  // ===== PATTERN 13: HARD - Polyrhythmic kick with displaced backbeat and toms =====
  // Kick in 3s, snare displaced, tom accents
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false],    // SN (e-of-2, a-of-4 both measures)
    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],     // KD (every 3 steps)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (step 28)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // LT (step 15)
  ], 'sixteenth', 2, 86, ['advanced-syncopation', 'polyrhythmic-feel', 'tom-fills'], 'hard'),

  // ===== PATTERN 14: HARD - Complex two-bar syncopated phrase =====
  // Different complex pattern each measure
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, true, true, false, false, false, false, true, false, false, false, false, true, true, false, false, false, true, true, false, true, false, false, true, false, true, true, false, false, false],    // SN (complex: e-of-1, a-of-1, 2, e-of-3, a-of-4, 4 m1 / a-of-1, 2, e-of-2, e-of-3, a-of-3, 4 m2)
    [true, false, false, false, false, false, true, false, true, false, false, true, false, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false],     // KD (1, a-of-2, 3, e-of-3 m1 / 1, &-of-1, 3, a-of-4 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['advanced-syncopation', 'two-bar-memory', 'sixteenth-note-precision'], 'hard'),

  // ===== PATTERN 15: HARD - Full kit syncopation with all voices =====
  // Ultimate challenge: all instruments with heavy syncopation
  createPattern([
    [true, true, true, false, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, false, true, true, true, true, true], // HH (gaps for OH)
    [false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false], // OH (a-of-1, e-of-3)
    [false, true, false, false, true, false, true, false, false, true, false, false, false, true, false, true, false, true, false, false, true, false, true, false, false, true, false, false, false, true, false, true],    // SN (e-of-1, 2, e-of-2, e-of-3, a-of-4, a-of-4)
    [true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false],     // KD (1, a-of-2, e-of-3)
    [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],     // HT (beat 4 m1, step 28 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // LT (a-of-4 m1, step 30 m2)
  ], 'sixteenth', 2, 85, ['advanced-syncopation', 'ghost-notes', 'tom-fills', 'pattern-completion'], 'hard'),
];

// Export full lesson with metadata and patterns
export const lesson10 = {
  ...LESSON_10_METADATA,
  patterns: LESSON_10_PATTERNS,
  totalQuestions: LESSON_10_PATTERNS.length
};
