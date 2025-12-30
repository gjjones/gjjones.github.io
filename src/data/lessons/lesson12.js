import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 12: Linear Patterns
 *
 * Learning Goal: Identify patterns where only one drum voice sounds at a time
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: Strict linear rule - no two drums hit simultaneously
 * Focus: Single-stroke patterns creating groove through hand-to-foot coordination
 */

export const LESSON_12_METADATA = {
  id: 'lesson-12-linear-patterns',
  phase: 4,
  lessonNumber: 12,
  title: 'Linear Patterns',
  concept: 'One voice at a time - no simultaneous hits',
  quality: 'linear-drumming',
  description: '16th note grid with strict linear constraint. Focus on transcribing patterns where each note is isolated, creating groove through the interplay of different drum voices with no overlaps.',
  instruments: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // All 7 instruments
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // All instruments editable
    linear: true  // Special constraint: no simultaneous hits allowed
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 linear patterns identifying hand-foot coordination and single-stroke patterns',
  prerequisites: ['lesson-11-advanced-fills'],
  nextLessons: [],

  genreContext: {
    primary: 'Funk, Fusion, Gospel',
    description: 'Linear drumming is a hallmark of funk (Clyde Stubblefield, David Garibaldi) and fusion (Steve Gadd, Vinnie Colaiuta). By playing one voice at a time, drummers create clarity, conversation between drums, and intricate rhythmic patterns. Gospel drummers use linear patterns for dynamic builds.',
  }
};

/**
 * Lesson 12 Patterns (15 total: 5 easy, 5 medium, 5 hard)
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
 * LINEAR RULE: At any given step, only ONE instrument can be true
 *
 * EASY (Patterns 1-5): Simple linear patterns with basic hi-hat/snare/kick, tempo 84-88 BPM
 * MEDIUM (Patterns 6-10): More complex interplay with ghost notes and toms, tempo 82-87 BPM
 * HARD (Patterns 11-15): Advanced linear patterns with all instruments and syncopation, tempo 81-86 BPM
 */

export const LESSON_12_PATTERNS = [
  // ===== PATTERN 1: EASY - Basic linear groove (HH-SN-HH-KD) =====
  // Simple four-voice pattern: hi-hat, snare, hi-hat, kick
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (on 1, e, &, a of each beat)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false],    // SN (e-of-2, e-of-4)
    [false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true],     // KD (e-of-1, a-of-2, e-of-3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['linear-drumming', 'hand-foot-coordination'], 'easy'),

  // ===== PATTERN 2: EASY - Linear backbeat feel =====
  // Hi-hat on 16ths with linear kick and snare placement
  createPattern([
    [true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false], // HH (gaps for SN and KD)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (e-of-1 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['linear-drumming', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 3: EASY - Three-voice linear (HH-SN-KD) =====
  // Consistent pattern cycling through three voices
  createPattern([
    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true], // HH (every 3 steps: 0, 3, 6, 9, 12, 15)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false],    // SN (every 3 steps: 1, 4, 7, 10, 13)
    [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false],     // KD (every 3 steps: 2, 5, 8, 11, 14)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 88, ['linear-drumming', 'polyrhythmic-feel'], 'easy'),

  // ===== PATTERN 4: EASY - Linear with open hi-hat accents =====
  // Open hi-hat creates linear accents
  createPattern([
    [true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false], // HH (gaps for OH, SN, KD)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // OH (2, 4)
    [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false],    // SN (a-of-1, e-of-3)
    [false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true],     // KD (e-of-1, a-of-2, e-of-3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['linear-drumming', 'open-hihat-choking'], 'easy'),

  // ===== PATTERN 5: EASY - Linear funky pattern =====
  // Funk-style linear groove with gaps
  createPattern([
    [true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false], // HH (gaps at a-of-2, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false],    // SN (a-of-2, a-of-4)
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],     // KD (all e and a beats)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['linear-drumming', 'syncopation'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Linear with ghost notes =====
  // Mix of loud and soft hits, all linear
  createPattern([
    [true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, true, true, false, false, false, false, true, false, true, true, false, false, false, false, true, false, true, true, false, false, false, false, true, false, true, true, false, false, false],    // SN (ghost notes: e-of-1, a-of-1, 2, e-of-3, a-of-3, 4)
    [false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true],     // KD (e-of-2, a-of-2, a-of-4, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['linear-drumming', 'ghost-notes'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Linear tom accents =====
  // Toms added to linear hi-hat/snare/kick pattern
  createPattern([
    [true, false, true, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, false, false, false, false, true, false], // HH (gaps for all other voices)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true],     // KD (e-of-1, a-of-2, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],     // HT (e-of-3)
    [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false],     // MT (a-of-3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 82, ['linear-drumming', 'tom-fills'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Complex linear interplay =====
  // Four voices create conversational pattern
  createPattern([
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // HH (quarter note pulse)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (e-of-1, a-of-2, e-of-3, a-of-4)
    [false, false, true, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, true, false, false, true, false, false, false, true, false, false, false, true, false, false],     // KD (e-of-1, e-of-2, e-of-3, a-of-4)
    [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true],     // HT (all a beats)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['linear-drumming', 'hand-foot-coordination'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Linear syncopation =====
  // Syncopated accents in linear framework
  createPattern([
    [true, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false], // HH (gaps create syncopation)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false],    // SN (a-of-2, e-of-3, a-of-4)
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],     // KD (all e and a beats)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['linear-drumming', 'syncopation'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Linear two-bar phrase =====
  // Different pattern each measure creating two-bar phrase
  createPattern([
    [true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false, false, false, false, false, true, false], // HH (different each measure)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false],    // SN (2, 4 m1 / 1, 2, e-of-3, 4 m2)
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],     // KD (all e and a beats)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['linear-drumming', 'two-bar-memory'], 'medium'),

  // ===== PATTERN 11: HARD - Full kit linear orchestration =====
  // All seven instruments in linear conversation
  createPattern([
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // HH (downbeats)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, true, false, false],    // SN (e-of-1, a-of-2, a-of-4)
    [false, false, true, false, false, true, false, false, false, true, false, false, false, false, false, true, false, false, true, false, false, true, false, false, false, true, false, false, false, false, false, true],     // KD (e-of-1, e-of-2, e-of-3, a-of-4)
    [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false],     // HT (a-of-1)
    [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],     // MT (a-of-2)
    [false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false],     // LT (e-of-3, a-of-4)
  ], 'sixteenth', 2, 81, ['linear-drumming', 'hand-foot-coordination', 'tom-fills'], 'hard'),

  // ===== PATTERN 12: HARD - Fast linear singles (RLRLRLRL) =====
  // Single-stroke roll distributed across the kit
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (R hand on downbeats and &s)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],    // SN (L hand on all e and a beats)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (not used - all hands)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['linear-drumming', 'sixteenth-note-precision'], 'hard'),

  // ===== PATTERN 13: HARD - Polyrhythmic linear pattern (3 over 4) =====
  // Linear pattern in groups of 3 creating polyrhythm
  createPattern([
    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true], // HH (every 3 steps)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false],    // SN (every 3 steps offset by 1)
    [false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false],     // KD (every 3 steps offset by 2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['linear-drumming', 'polyrhythmic-feel'], 'hard'),

  // ===== PATTERN 14: HARD - Linear ghost note funk =====
  // Complex ghost note pattern, all linear
  createPattern([
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // HH (quarter notes)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true, true, false, false, false, true, false],    // SN (ghost notes: e-of-1, e-of-1, a-of-2, e-of-3, e-of-3, a-of-4)
    [false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false, true],     // KD (a-of-1, e-of-2, a-of-2, a-of-3, a-of-4, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['linear-drumming', 'ghost-notes', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Ultimate linear complexity =====
  // All instruments, maximum variation, strict linear
  createPattern([
    [true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false], // HH (irregular pattern)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false],    // SN (e-of-1, e-of-3)
    [false, false, true, false, false, true, false, false, false, false, false, false, false, true, false, true, false, false, true, false, false, true, false, false, false, false, false, false, false, true, false, true],     // KD (e-of-1, e-of-2, a-of-4, a-of-4)
    [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false],     // HT (a-of-1)
    [false, false, false, false, true, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, true, false, false, false, false, false, false],     // MT (2, a-of-2, e-of-3)
    [false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false],     // LT (e-of-3, a-of-3)
  ], 'sixteenth', 2, 85, ['linear-drumming', 'hand-foot-coordination', 'tom-fills', 'pattern-completion'], 'hard'),
];

// Export full lesson with metadata and patterns
export const lesson12 = {
  ...LESSON_12_METADATA,
  patterns: LESSON_12_PATTERNS,
  totalQuestions: LESSON_12_PATTERNS.length
};
