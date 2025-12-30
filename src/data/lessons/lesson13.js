import { createPattern } from '../../utils/patternUtils.js';

/**
 * Lesson 13: Complete Grooves
 *
 * Learning Goal: Transcribe complete, musical drum patterns that combine all techniques
 * Grid: 16th note resolution, 2 measures = 32 total steps
 * Constraint: None - all instruments editable
 * Focus: Full drum grooves integrating all skills: syncopation, ghost notes, fills, dynamics
 */

export const LESSON_13_METADATA = {
  id: 'lesson-13-complete-grooves',
  phase: 4,
  lessonNumber: 13,
  title: 'Complete Grooves',
  concept: 'Full, musical drum patterns combining all techniques',
  quality: 'complete-groove',
  description: '16th note grid with no constraints. Focus on transcribing complete, genre-specific drum grooves that combine syncopation, ghost notes, fills, and dynamic variation into musical phrases.',
  instruments: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT'],  // All 7 instruments
  gridSize: 16,  // 16th note resolution
  measures: 2,

  constraints: {
    locked: {},  // Nothing locked - student transcribes everything
    available: ['HH', 'OH', 'SN', 'KD', 'HT', 'MT', 'LT']  // All instruments editable
  },

  tempos: [85, 115],  // Slow analytical tempo to standard groove tempo
  learningGoal: 'Transcribe 15 complete grooves demonstrating musicality, genre awareness, and technical integration',
  prerequisites: ['lesson-12-linear-patterns'],
  nextLessons: [],

  genreContext: {
    primary: 'All Styles - Rock, Funk, Jazz, Hip-Hop, Gospel',
    description: 'Complete grooves are the culmination of all drumming skills. These patterns represent real-world playing across genres: the pocket of Motown, the syncopation of funk, the swing of jazz, the power of rock. Mastering these grooves develops musicality and the ability to serve the song.',
  }
};

/**
 * Lesson 13 Patterns (15 total: 5 easy, 5 medium, 5 hard)
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
 * EASY (Patterns 1-5): Classic genre grooves with clear structure, tempo 84-88 BPM
 * MEDIUM (Patterns 6-10): More complex grooves with fills and variation, tempo 82-87 BPM
 * HARD (Patterns 11-15): Advanced grooves with full technical integration, tempo 81-86 BPM
 */

export const LESSON_13_PATTERNS = [
  // ===== PATTERN 1: EASY - Classic rock beat with fill =====
  // Standard rock groove, simple fill at end
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false], // HH (stops for fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, true, true, false, true],    // SN (2, 4, then fill: steps 26-29, 31)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],     // HT (step 30)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['complete-groove', 'backbeat-placement', 'fill-construction'], 'easy'),

  // ===== PATTERN 2: EASY - Motown groove =====
  // Classic Motown pocket with tambourine-style hi-hat
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH (steady 16ths)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (beat 1 both measures)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['complete-groove', 'backbeat-placement', 'sixteenth-note-precision'], 'easy'),

  // ===== PATTERN 3: EASY - Half-time shuffle feel =====
  // Laid-back groove with shuffle placement
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (straight 16ths)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // SN (beat 3 both measures - half-time)
    [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],     // KD (beat 1 only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 88, ['complete-groove', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 4: EASY - Basic funk with open hi-hat =====
  // Funk groove with open hi-hat on 2 and 4
  createPattern([
    [true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true], // HH (gaps for OH)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // OH (2, 4)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4 with OH)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false],     // KD (1, 3, a-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['complete-groove', 'open-hihat-choking', 'syncopation'], 'easy'),

  // ===== PATTERN 5: EASY - Train beat =====
  // Classic train rhythm pattern
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (straight 8ths on e's)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],     // KD (quarter notes)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['complete-groove', 'backbeat-placement'], 'easy'),

  // ===== PATTERN 6: MEDIUM - Funk groove with ghost notes =====
  // Funk pattern with ghost note texture
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH (steady 16ths)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false],    // SN (ghost notes on e's, accents on 2 & 4)
    [true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],     // KD (1, a-of-2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['complete-groove', 'ghost-notes', 'syncopation'], 'medium'),

  // ===== PATTERN 7: MEDIUM - Disco groove with fills =====
  // Four-on-the-floor with tom embellishments
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH (stops for fill)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false], // OH (2, 4 m1, 3 m2)
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, true, true],    // SN (2, 4, then fill)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (four on the floor)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false],     // HT (fill: steps 25, 27)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],     // MT (step 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 82, ['complete-groove', 'fill-construction', 'open-hihat-choking'], 'medium'),

  // ===== PATTERN 8: MEDIUM - Hip-hop pocket =====
  // Laid-back hip-hop groove with syncopated kicks
  createPattern([
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // HH (straight 16ths)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],    // SN (2, 4)
    [true, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, a-of-1, 3)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 87, ['complete-groove', 'syncopation', 'kick-drum-precision'], 'medium'),

  // ===== PATTERN 9: MEDIUM - Samba-influenced pattern =====
  // Brazilian-style groove with syncopated accents
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // HH
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false],    // SN (e-of-2, a-of-4)
    [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],     // KD (Brazilian pattern: 1, a-of-1, &-of-2, 3, a-of-3, &-of-4)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['complete-groove', 'syncopation', 'polyrhythmic-feel'], 'medium'),

  // ===== PATTERN 10: MEDIUM - Reggae one-drop =====
  // One-drop groove with kick/snare on 3
  createPattern([
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // HH (&s only)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],    // SN (beat 3 only - one drop)
    [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (beat 3 only - one drop)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['complete-groove', 'backbeat-displacement'], 'medium'),

  // ===== PATTERN 11: HARD - Gospel chop pattern =====
  // Complex gospel groove with all elements
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false], // HH (stops for fill)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false], // OH (accents in fill)
    [false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, false, false, true, true, false, false, true, true, true],    // SN (ghost notes + accents)
    [true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false],     // KD (1, a-of-2, then fill kicks)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 81, ['complete-groove', 'ghost-notes', 'syncopation', 'fill-construction'], 'hard'),

  // ===== PATTERN 12: HARD - Fusion linear groove =====
  // Steve Gadd-style linear groove
  createPattern([
    [true, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false, true, false, false, false, true, false, false, false, true, false, false, false], // HH (linear gaps)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, true, false, true, false, false, true, false, false, true, true, false, false, false, true, false, false, true, false, true, false, false, true, false, false, true, true, false, false, false, true, false],    // SN (linear: e's, ghost notes)
    [false, false, false, false, false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, false, false, true, false, true, false, false, false, true, false, true, false, true],     // KD (linear: syncopated)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 84, ['complete-groove', 'linear-drumming', 'ghost-notes', 'syncopation'], 'hard'),

  // ===== PATTERN 13: HARD - Progressive rock pattern with toms =====
  // Complex groove with tom orchestration
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false], // HH (stops early for tom section)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, true, false, true, false, true, false, true, true],    // SN (2, 4, then complex fill)
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],     // KD (1, 3, a-of-4 m1, then beat 1 + 3 m2)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false],     // HT (steps 20, 23)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, true, false, true, false, false],     // MT (steps 21, 25, 27, 29)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 86, ['complete-groove', 'tom-fills', 'syncopation', 'pattern-completion'], 'hard'),

  // ===== PATTERN 14: HARD - Afro-Cuban 6/8 feel (in 16ths) =====
  // Latin groove with cascara-style pattern
  createPattern([
    [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false], // HH (cascara rhythm)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // OH
    [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false],    // SN (4 - clave accent)
    [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],     // KD (1, e-of-3 - tumbao pattern)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // HT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 83, ['complete-groove', 'polyrhythmic-feel', 'syncopation'], 'hard'),

  // ===== PATTERN 15: HARD - Ultimate musical groove =====
  // Complex two-bar phrase combining all techniques
  createPattern([
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, false, false, false, false, false, false, false, false], // HH (varied)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // OH (accents: steps 20, 28)
    [false, true, false, true, true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, true, false, false, false, false, false, true, true, false, false, true, true, true],    // SN (ghost notes + accents + fill)
    [true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false],     // KD (syncopated pattern)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false],     // HT (step 21)
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // MT
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // LT
  ], 'sixteenth', 2, 85, ['complete-groove', 'ghost-notes', 'syncopation', 'fill-construction', 'open-hihat-choking', 'pattern-completion'], 'hard'),
];

// Export full lesson with metadata and patterns
export const lesson13 = {
  ...LESSON_13_METADATA,
  patterns: LESSON_13_PATTERNS,
  totalQuestions: LESSON_13_PATTERNS.length
};
