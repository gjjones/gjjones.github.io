/**
 * Curriculum Structure - Lesson Metadata Schema
 *
 * Defines the structure for lesson metadata across the rhythm curriculum.
 * Each lesson includes metadata, constraints, patterns, and learning objectives.
 */

/**
 * Lesson metadata schema
 * @typedef {Object} LessonMetadata
 * @property {string} id - Unique lesson identifier (e.g., 'lesson-1-kick-snare-skeleton')
 * @property {number} phase - Curriculum phase (1-3 for core, review, or expansion)
 * @property {number} lessonNumber - Sequential lesson number (1-17)
 * @property {string} title - Lesson title
 * @property {string} concept - Core rhythmic concept being taught
 * @property {string} quality - Quality identifier (e.g., 'downbeat-identification')
 * @property {string} description - Brief description of the lesson structure
 * @property {string[]} instruments - Instruments used in the lesson (e.g., ['HH', 'SN', 'KD'])
 * @property {number} gridSize - Steps per measure (8 or 16)
 * @property {number} measures - Number of measures in each pattern (typically 2)
 * @property {LessonConstraints} constraints - Pattern constraints
 * @property {Pattern[]} patterns - Array of 10 patterns for this lesson
 * @property {number[]} tempos - [min, max] tempo range for playback
 * @property {string} learningGoal - Clear statement of what student will learn
 * @property {string[]} prerequisites - Lesson IDs that must be completed first
 * @property {string[]} nextLessons - Suggested next lesson IDs
 * @property {GenreContext} [genreContext] - Optional genre/style context
 */

/**
 * Lesson constraints define what's locked and what's editable
 * @typedef {Object} LessonConstraints
 * @property {Object.<string, number[]>} locked - Instrument -> step indices that are locked
 * @property {string[]} available - Instruments that are editable by the student
 * @property {Object.<string, PlacementRules>} [rules] - Optional rules for pattern generation
 */

/**
 * Pattern generation rules for an instrument
 * @typedef {Object} PlacementRules
 * @property {number} minNotes - Minimum notes for this instrument
 * @property {number} maxNotes - Maximum notes for this instrument
 * @property {number[]} allowedSteps - Steps where this instrument can be placed
 * @property {number[]} [preferredSteps] - Steps that should be emphasized
 * @property {string[]} [avoidSimultaneous] - Instruments to avoid placing simultaneously
 * @property {boolean} [avoidAdjacent] - Whether to avoid adjacent placements
 */

/**
 * Genre context for a lesson
 * @typedef {Object} GenreContext
 * @property {string} primary - Primary genre(s) where this pattern appears
 * @property {string} description - Description of how this pattern is used in genre
 * @property {Array.<{artist: string, song: string}>} [examples] - Example songs (future: audio clips)
 */

/**
 * Pattern definition (grid state)
 * @typedef {Object} Pattern
 * @property {string} id - Unique pattern identifier
 * @property {Object.<string, number[]>} grid - Instrument -> array of step indices where notes are placed
 * @property {number} [difficulty] - Difficulty rating (1-3: easy, medium, hard)
 */

/**
 * Example lesson structure
 * This serves as a template for creating new lessons
 */
export const EXAMPLE_LESSON = {
  id: 'lesson-1-kick-snare-skeleton',
  phase: 1,
  lessonNumber: 1,
  title: 'The Kick/Snare Skeleton',
  concept: 'Identifying kick placement on "The One" vs "The Three"',
  quality: 'downbeat-identification',
  description: '8-step grid with snare fixed on beats 2 & 4',
  instruments: ['HH', 'SN', 'KD'],
  gridSize: 8,
  measures: 2,
  constraints: {
    locked: {
      SN: [4, 12] // Snare fixed on steps 5 & 13 (0-indexed: steps 4 & 12)
    },
    available: ['KD'] // Only kick is editable
  },
  patterns: [
    // 10 patterns will be defined here
    // Each pattern is an object with id, grid, and optional difficulty
  ],
  tempos: [85, 115], // BPM range
  learningGoal: 'Transcribe 10 patterns with kick on steps 1, 9, or both',
  prerequisites: [], // No prerequisites for lesson 1
  nextLessons: ['lesson-2-the-ands'] // Suggested next lesson
};

/**
 * Lesson quality identifiers
 * These map to specific rhythmic concepts being taught
 */
export const LESSON_QUALITIES = {
  DOWNBEAT_IDENTIFICATION: 'downbeat-identification',
  UPBEAT_IDENTIFICATION: 'upbeat-identification',
  BACKBEAT_PLACEMENT: 'backbeat-placement',
  DISPLACED_BACKBEAT: 'displaced-backbeat',
  GHOST_NOTES: 'ghost-notes',
  OFFBEAT_HI_HAT: 'offbeat-hi-hat',
  SYNCOPATION: 'syncopation',
  SWING_FEEL: 'swing-feel',
  RIDE_CYMBAL: 'ride-cymbal',
  HALF_TIME_FEEL: 'half-time-feel',
  CRASH_ACCENTS: 'crash-accents',
  TOM_FILLS: 'tom-fills'
};

/**
 * Instrument identifiers
 * Maps to both MIDI notes and sample files
 */
export const INSTRUMENTS = {
  HH: 'HH',           // Hi-hat
  SN: 'SN',           // Snare
  KD: 'KD',           // Kick drum
  TOM_HI: 'TOM_HI',   // High tom
  TOM_LO: 'TOM_LO',   // Low tom
  RIDE: 'RIDE',       // Ride cymbal
  CRASH: 'CRASH',     // Crash cymbal
  RIDE_BELL: 'RIDE_BELL' // Ride bell
};

/**
 * Grid sizes supported by the app
 */
export const GRID_SIZES = {
  EIGHTH_NOTES: 8,   // 8 steps per measure (8th note resolution)
  SIXTEENTH_NOTES: 16, // 16 steps per measure (16th note resolution)
  TRIPLETS: 12       // 12 steps per measure (triplet resolution, for swing)
};

/**
 * Difficulty levels for patterns
 */
export const DIFFICULTY_LEVELS = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3
};

/**
 * Validate lesson metadata structure
 * @param {LessonMetadata} lesson - Lesson to validate
 * @returns {{valid: boolean, errors: string[]}} Validation result
 */
export function validateLessonMetadata(lesson) {
  const errors = [];

  // Required fields
  if (!lesson.id) errors.push('Missing lesson id');
  if (typeof lesson.phase !== 'number') errors.push('Missing or invalid phase');
  if (typeof lesson.lessonNumber !== 'number') errors.push('Missing or invalid lessonNumber');
  if (!lesson.title) errors.push('Missing title');
  if (!lesson.concept) errors.push('Missing concept');
  if (!lesson.quality) errors.push('Missing quality');
  if (!lesson.description) errors.push('Missing description');

  // Instruments
  if (!Array.isArray(lesson.instruments) || lesson.instruments.length === 0) {
    errors.push('Missing or empty instruments array');
  }

  // Grid configuration
  if (typeof lesson.gridSize !== 'number' || ![8, 12, 16].includes(lesson.gridSize)) {
    errors.push('Invalid gridSize (must be 8, 12, or 16)');
  }
  if (typeof lesson.measures !== 'number' || lesson.measures < 1) {
    errors.push('Invalid measures (must be >= 1)');
  }

  // Constraints
  if (!lesson.constraints) {
    errors.push('Missing constraints');
  } else {
    if (!lesson.constraints.locked || typeof lesson.constraints.locked !== 'object') {
      errors.push('Missing or invalid constraints.locked');
    }
    if (!Array.isArray(lesson.constraints.available)) {
      errors.push('Missing or invalid constraints.available');
    }
  }

  // Patterns
  if (!Array.isArray(lesson.patterns)) {
    errors.push('Missing patterns array');
  } else if (lesson.patterns.length === 0) {
    errors.push('Patterns array is empty (should have 10 patterns)');
  }

  // Tempos
  if (!Array.isArray(lesson.tempos) || lesson.tempos.length !== 2) {
    errors.push('Invalid tempos (should be [min, max] array)');
  }

  // Learning objectives
  if (!lesson.learningGoal) errors.push('Missing learningGoal');
  if (!Array.isArray(lesson.prerequisites)) errors.push('Missing prerequisites array');
  if (!Array.isArray(lesson.nextLessons)) errors.push('Missing nextLessons array');

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Create an empty lesson template
 * @param {string} id - Lesson ID
 * @param {number} phase - Curriculum phase
 * @param {number} lessonNumber - Lesson number
 * @returns {LessonMetadata} Empty lesson template
 */
export function createLessonTemplate(id, phase, lessonNumber) {
  return {
    id,
    phase,
    lessonNumber,
    title: '',
    concept: '',
    quality: '',
    description: '',
    instruments: [],
    gridSize: 16,
    measures: 2,
    constraints: {
      locked: {},
      available: []
    },
    patterns: [],
    tempos: [85, 115],
    learningGoal: '',
    prerequisites: [],
    nextLessons: []
  };
}
