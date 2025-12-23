/**
 * Utility functions for determining playback capability
 */

/**
 * Check if at least one instrument has a loaded sample
 * @param {Array} instruments - Array of instrument configurations
 * @param {Function} getAudioBuffer - Function to get audio buffer for an instrument index
 * @returns {boolean} True if any sample-type instrument has a loaded buffer
 */
export function hasSamplesAvailable(instruments, getAudioBuffer) {
  if (!instruments || !getAudioBuffer) return false;

  return instruments.some((instrument, index) => {
    if (instrument.type === 'sample') {
      const buffer = getAudioBuffer(index);
      return !!buffer;
    }
    return false;
  });
}

/**
 * Check if playback is possible via MIDI
 * @param {Object} selectedOutput - Selected MIDI output device
 * @returns {boolean} True if MIDI device is connected
 */
export function isMidiAvailable(selectedOutput) {
  return selectedOutput && selectedOutput.state === 'connected';
}

/**
 * Check if playback is possible via any method (MIDI or samples)
 * @param {Object} selectedOutput - Selected MIDI output device
 * @param {Array} instruments - Array of instrument configurations
 * @param {Function} getAudioBuffer - Function to get audio buffer for an instrument index
 * @returns {boolean} True if playback is possible
 */
export function canPlayback(selectedOutput, instruments, getAudioBuffer) {
  return isMidiAvailable(selectedOutput) || hasSamplesAvailable(instruments, getAudioBuffer);
}

/**
 * Determine if MIDI permission is required
 * @param {Array} instruments - Array of instrument configurations
 * @returns {boolean} True if any instrument is configured for MIDI
 */
export function requiresMidiPermission(instruments) {
  if (!instruments) return true; // Default to requiring permission

  // Check if any instrument is MIDI type (or has no type, defaults to MIDI)
  return instruments.some(instrument => !instrument.type || instrument.type === 'midi');
}
