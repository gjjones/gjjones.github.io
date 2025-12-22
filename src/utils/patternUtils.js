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
 * @returns {Object} Pattern object with steps and metadata
 */
export function createPattern(steps, resolution, measures) {
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
  };
}

/**
 * Creates an empty sequence (all steps false) for a given step count
 *
 * @param {number} stepCount - Number of steps per track
 * @returns {Array<Array<boolean>>} Empty 3-track sequence
 */
export function createEmptySequence(stepCount) {
  return [
    Array(stepCount).fill(false), // HH
    Array(stepCount).fill(false), // SN
    Array(stepCount).fill(false), // KD
  ];
}
