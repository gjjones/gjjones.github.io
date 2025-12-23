import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PRESET, PRESETS } from '../constants/drumPresets';

const STORAGE_KEY = 'drumSettings';

/**
 * Custom hook for managing drum instrument MIDI settings
 * Provides localStorage persistence and preset management
 */
export function useDrumSettings() {
  // Initialize from localStorage or use default
  const [instruments, setInstruments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.instruments || DEFAULT_PRESET.instruments;
      }
    } catch (err) {
      console.error('Failed to load drum settings:', err);
    }
    return DEFAULT_PRESET.instruments;
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
      setInstruments(preset.instruments);
    }
  }, []);

  // Reset to default preset
  const resetToDefault = useCallback(() => {
    setInstruments(DEFAULT_PRESET.instruments);
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

  return {
    instruments,
    updateInstrument,
    loadPreset,
    resetToDefault,
    getMidiParams,
  };
}
