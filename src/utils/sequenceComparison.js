/**
 * Compares two sequences and returns comparison results
 * @param {Array<Array<boolean>>} userSeq - User's sequence
 * @param {Array<Array<boolean>>} hiddenSeq - Hidden/target sequence
 * @returns {Object} Comparison result with correct flag and differences array
 */
export function compareSequences(userSeq, hiddenSeq) {
  const differences = getDifferences(userSeq, hiddenSeq);
  const correct = differences.length === 0;

  return {
    correct,
    differences,
    differenceCount: differences.length,
  };
}

/**
 * Gets all differences between two sequences
 * @param {Array<Array<boolean>>} userSeq - User's sequence
 * @param {Array<Array<boolean>>} hiddenSeq - Hidden/target sequence
 * @returns {Array<Object>} Array of difference objects {track, step, type}
 */
export function getDifferences(userSeq, hiddenSeq) {
  const differences = [];

  // Validation: Ensure both sequences have same number of tracks
  if (userSeq.length !== hiddenSeq.length) {
    console.error('Sequence track count mismatch:', userSeq.length, 'vs', hiddenSeq.length);
    return differences;
  }

  for (let trackIdx = 0; trackIdx < userSeq.length; trackIdx++) {
    const userTrack = userSeq[trackIdx];
    const hiddenTrack = hiddenSeq[trackIdx];

    // Validation: Ensure both tracks have same length
    if (userTrack.length !== hiddenTrack.length) {
      console.error(
        `Track ${trackIdx} length mismatch: user=${userTrack.length}, hidden=${hiddenTrack.length}`
      );
      continue;
    }

    for (let stepIdx = 0; stepIdx < userTrack.length; stepIdx++) {
      const userHasNote = userTrack[stepIdx];
      const hiddenHasNote = hiddenTrack[stepIdx];

      if (userHasNote !== hiddenHasNote) {
        differences.push({
          track: trackIdx,
          step: stepIdx,
          type: hiddenHasNote ? 'add' : 'remove', // 'add' = should add, 'remove' = should remove
        });
      }
    }
  }

  return differences;
}
