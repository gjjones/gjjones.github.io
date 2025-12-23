import { useCallback, useRef } from 'react';

/**
 * Provides Web Audio-based sample playback with precise timing
 *
 * Uses Web Audio API to play audio samples at exact timestamps,
 * matching the precision of the MIDI timing system.
 *
 * @param {Object} params
 * @param {AudioContext} params.audioContext - Shared Web Audio context from timing clock
 */
export function useAudioSamplePlayer({ audioContext }) {
  // Track active source nodes for cleanup
  const activeSourcesRef = useRef(new Set());

  /**
   * Schedule a sample to play at a specific timestamp
   *
   * @param {AudioBuffer} audioBuffer - The loaded audio sample
   * @param {number} timestamp - Exact time to play (in AudioContext time domain)
   * @param {number} velocity - MIDI-style velocity (0-127) for volume control
   * @param {number} [duration] - Optional duration in ms (unused for samples, kept for API compatibility)
   * @returns {AudioBufferSourceNode|null} The created source node, or null if failed
   */
  const scheduleSample = useCallback((audioBuffer, timestamp, velocity, duration = null) => {
    if (!audioContext) {
      console.warn('[AudioSamplePlayer] No audio context available');
      return null;
    }

    if (!audioBuffer) {
      console.warn('[AudioSamplePlayer] No audio buffer provided');
      return null;
    }

    try {
      // Create source node for this sample playback
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Create gain node for velocity-based volume control
      const gainNode = audioContext.createGain();

      // Convert MIDI velocity (0-127) to gain (0-1)
      // Using a curve for more natural volume response
      const normalizedVelocity = Math.max(0, Math.min(127, velocity)) / 127;
      gainNode.gain.value = normalizedVelocity * normalizedVelocity; // Square for exponential feel

      // Connect: source → gain → destination
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Track active source for cleanup
      activeSourcesRef.current.add(source);

      // Clean up when sample finishes
      source.onended = () => {
        activeSourcesRef.current.delete(source);
        source.disconnect();
        gainNode.disconnect();
      };

      // Schedule playback at precise timestamp
      // If timestamp is in the past or very close to now, play immediately
      const now = audioContext.currentTime;
      const playTime = timestamp < now ? now : timestamp;

      source.start(playTime);

      return source;
    } catch (error) {
      console.error('[AudioSamplePlayer] Failed to schedule sample:', error);
      return null;
    }
  }, [audioContext]);

  /**
   * Stop all currently playing samples
   * Useful for emergency stops or cleanup
   */
  const stopAll = useCallback(() => {
    activeSourcesRef.current.forEach(source => {
      try {
        source.stop();
        source.disconnect();
      } catch (error) {
        // Source may have already stopped naturally
      }
    });
    activeSourcesRef.current.clear();
  }, []);

  /**
   * Load an audio file from a URL and decode it
   *
   * @param {string} url - URL to audio file
   * @returns {Promise<AudioBuffer>} Decoded audio buffer ready for playback
   */
  const loadSample = useCallback(async (url) => {
    if (!audioContext) {
      throw new Error('No audio context available');
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      return audioBuffer;
    } catch (error) {
      console.error('[AudioSamplePlayer] Failed to load sample:', error);
      throw error;
    }
  }, [audioContext]);

  /**
   * Load an audio file from a File object (user upload)
   *
   * @param {File} file - Audio file from file input
   * @returns {Promise<AudioBuffer>} Decoded audio buffer ready for playback
   */
  const loadSampleFromFile = useCallback(async (file) => {
    if (!audioContext) {
      throw new Error('No audio context available');
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      return audioBuffer;
    } catch (error) {
      console.error('[AudioSamplePlayer] Failed to load sample from file:', error);
      throw error;
    }
  }, [audioContext]);

  return {
    scheduleSample,
    stopAll,
    loadSample,
    loadSampleFromFile,
  };
}
