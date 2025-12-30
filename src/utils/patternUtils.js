/**
 * Pattern utility functions for creating and managing rhythm patterns
 * with different resolutions (quarter, eighth, sixteenth notes) and lengths
 */

export const RESOLUTION_CONFIG = {
  quarter: { stepsPerMeasure: 4, division: 1 },
  eighth: { stepsPerMeasure: 8, division: 2 },
  sixteenth: { stepsPerMeasure: 16, division: 4 },
};

/**
 * Creates a pattern object with metadata for resolution and length
 *
 * @param {Array<Array<boolean>>} steps - 3D array: [tracks][steps]
 * @param {'quarter'|'eighth'|'sixteenth'} resolution - Note subdivision
 * @param {number} measures - Number of measures (1-4)
 * @param {number|null} tempo - Optional BPM for this pattern (defaults to null)
 * @param {string[]|null} qualities - Optional array of quality identifiers (e.g., ['downbeat-identification', 'kick-drum-precision'])
 * @param {'easy'|'medium'|'hard'|null} difficulty - Optional difficulty level (defaults to 'medium')
 * @returns {Object} Pattern object with steps and metadata
 *
 * @example
 * // Pattern with quality and difficulty
 * createPattern(grid, 'eighth', 2, 85, ['downbeat-identification'], 'easy')
 *
 * @example
 * // Pattern with multiple qualities
 * createPattern(grid, 'eighth', 2, 87, ['downbeat-identification', 'kick-drum-precision'], 'medium')
 *
 * @example
 * // Pattern without qualities (backward compatible, will inherit lesson.quality)
 * createPattern(grid, 'eighth', 2, 85)
 */
export function createPattern(steps, resolution, measures, tempo = null, qualities = null, difficulty = 'medium') {
  const config = RESOLUTION_CONFIG[resolution];

  if (!config) {
    throw new Error(`Invalid resolution: ${resolution}. Must be 'quarter', 'eighth', or 'sixteenth'`);
  }

  // Validate difficulty
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (difficulty && !validDifficulties.includes(difficulty)) {
    console.warn(`Invalid difficulty: ${difficulty}. Defaulting to 'medium'`);
    difficulty = 'medium';
  }

  const stepsPerMeasure = config.stepsPerMeasure;
  const totalSteps = stepsPerMeasure * measures;

  // Validation: Ensure steps array matches expected length
  if (steps[0].length !== totalSteps) {
    throw new Error(
      `Pattern length mismatch: expected ${totalSteps} steps (${resolution} notes × ${measures} measures), got ${steps[0].length}`
    );
  }

  return {
    steps,
    resolution,
    measures,
    stepsPerMeasure,
    totalSteps,
    division: config.division,
    tempo,  // Optional BPM for this pattern
    qualities,  // Optional array of quality identifiers
    difficulty  // Difficulty level: 'easy', 'medium', or 'hard'
  };
}

/**
 * Creates an empty sequence (all steps false) for a given step count
 *
 * @param {number} stepCount - Number of steps per track
 * @param {number} trackCount - Number of tracks (default 3 for backward compatibility)
 * @returns {Array<Array<boolean>>} Empty sequence with specified track count
 */
export function createEmptySequence(stepCount, trackCount = 3) {
  return Array(trackCount).fill(null).map(() => Array(stepCount).fill(false));
}

/**
 * Creates a sequence with locked cells pre-filled from lesson constraints
 * Locked cells are set to true, all other cells are false
 *
 * @param {number} stepCount - Number of steps per track
 * @param {Object} constraints - Lesson constraints with locked cells
 * @param {Array} instruments - Array of instrument configs with labels
 * @returns {Array<Array<boolean>>} Sequence with locked cells pre-filled
 */
export function createSequenceWithLockedCells(stepCount, constraints, instruments) {
  // Start with empty sequence with correct number of tracks
  const trackCount = instruments.length || 3;
  const sequence = createEmptySequence(stepCount, trackCount);

  // If no constraints, return empty sequence
  if (!constraints || !constraints.locked) {
    return sequence;
  }

  // Pre-fill locked cells
  instruments.forEach((instrument, trackIndex) => {
    const lockedSteps = constraints.locked[instrument.label];
    if (lockedSteps && Array.isArray(lockedSteps)) {
      lockedSteps.forEach(stepIndex => {
        if (stepIndex >= 0 && stepIndex < stepCount) {
          sequence[trackIndex][stepIndex] = true;
        }
      });
    }
  });

  return sequence;
}

/**
 * Gets the quality identifiers for a pattern with fallback to lesson quality
 *
 * This helper centralizes the logic for determining which qualities a pattern tests:
 * 1. If pattern has explicit qualities array, use it
 * 2. Otherwise fall back to the lesson's quality (backward compatibility)
 * 3. If neither exist, return empty array
 *
 * @param {Object} pattern - Pattern object (from createPattern)
 * @param {Object} lesson - Lesson metadata object
 * @returns {string[]} Array of quality identifiers
 *
 * @example
 * // Pattern with explicit qualities
 * const pattern = { qualities: ['downbeat-identification', 'kick-precision'] };
 * getPatternQualities(pattern, lesson); // => ['downbeat-identification', 'kick-precision']
 *
 * @example
 * // Pattern without qualities, falls back to lesson
 * const pattern = { qualities: null };
 * const lesson = { quality: 'downbeat-identification' };
 * getPatternQualities(pattern, lesson); // => ['downbeat-identification']
 */
export function getPatternQualities(pattern, lesson) {
  if (pattern.qualities && Array.isArray(pattern.qualities)) {
    return pattern.qualities;
  }
  return lesson.quality ? [lesson.quality] : [];
}
