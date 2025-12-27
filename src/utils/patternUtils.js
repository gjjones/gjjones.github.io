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
 * @returns {Object} Pattern object with steps and metadata
 */
export function createPattern(steps, resolution, measures, tempo = null) {
  const config = RESOLUTION_CONFIG[resolution];

  if (!config) {
    throw new Error(`Invalid resolution: ${resolution}. Must be 'quarter', 'eighth', or 'sixteenth'`);
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
