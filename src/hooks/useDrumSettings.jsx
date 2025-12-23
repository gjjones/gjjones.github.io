import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PRESET, PRESETS } from '../constants/drumPresets';

const STORAGE_KEY = 'drumSettings';

/**
 * Migrate old instrument format to new format with type field
 */
function migrateInstruments(instruments) {
  return instruments.map(inst => ({
    ...inst,
    // Add type field if missing (backward compatibility)
    type: inst.type || 'midi',
    // Initialize sample-specific fields if type is 'sample'
    ...(inst.type === 'sample' && {
      audioBuffer: inst.audioBuffer || null,
      sampleUrl: inst.sampleUrl || null,
    })
  }));
}

/**
 * Custom hook for managing drum instrument settings (MIDI and audio samples)
 * Provides localStorage persistence and preset management
 */
export function useDrumSettings() {
  // Store audio buffers separately (not persisted to localStorage)
  const [audioBuffers, setAudioBuffers] = useState({});

  // Initialize from localStorage or use default
  const [instruments, setInstruments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const instruments = parsed.instruments || DEFAULT_PRESET.instruments;
        return migrateInstruments(instruments);
      }
    } catch (err) {
      console.error('Failed to load drum settings:', err);
    }
    return migrateInstruments(DEFAULT_PRESET.instruments);
  });

  // Persist to localStorage whenever instruments change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ instruments }));
    } catch (err) {
      console.error('Failed to save drum settings:', err);
    }
  }, [instruments]);

  // Update a specific instrument's configuration
  const updateInstrument = useCallback((index, updates) => {
    setInstruments(prev => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  }, []);

  // Load a preset configuration
  const loadPreset = useCallback((presetId) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setInstruments(migrateInstruments(preset.instruments));
      // Clear audio buffers when loading preset
      setAudioBuffers({});
    }
  }, []);

  // Reset to default preset
  const resetToDefault = useCallback(() => {
    setInstruments(migrateInstruments(DEFAULT_PRESET.instruments));
    setAudioBuffers({});
  }, []);

  // Get MIDI parameters for a specific track index
  const getMidiParams = useCallback((trackIndex) => {
    const instrument = instruments[trackIndex];
    if (!instrument) return null;
    return {
      channel: instrument.channel,
      note: instrument.note,
      velocity: instrument.velocity,
      duration: instrument.duration,
    };
  }, [instruments]);

  // Set audio buffer for a specific instrument
  const setAudioBuffer = useCallback((trackIndex, audioBuffer) => {
    setAudioBuffers(prev => ({
      ...prev,
      [trackIndex]: audioBuffer,
    }));
  }, []);

  // Get audio buffer for a specific track index
  const getAudioBuffer = useCallback((trackIndex) => {
    return audioBuffers[trackIndex] || null;
  }, [audioBuffers]);

  // Get instrument configuration with audio buffer
  const getInstrument = useCallback((trackIndex) => {
    const instrument = instruments[trackIndex];
    if (!instrument) return null;

    return {
      ...instrument,
      // Include audio buffer if instrument is sample type
      ...(instrument.type === 'sample' && {
        audioBuffer: audioBuffers[trackIndex] || null,
      }),
    };
  }, [instruments, audioBuffers]);

  return {
    instruments,
    updateInstrument,
    loadPreset,
    resetToDefault,
    getMidiParams,
    setAudioBuffer,
    getAudioBuffer,
    getInstrument,
  };
}
