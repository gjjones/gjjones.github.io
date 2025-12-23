// Validation constants for MIDI parameters
export const MIDI_CHANNEL_MIN = 1;
export const MIDI_CHANNEL_MAX = 16;
export const MIDI_NOTE_MIN = 0;
export const MIDI_NOTE_MAX = 127;
export const VELOCITY_MIN = 1;
export const VELOCITY_MAX = 127;
export const DURATION_MIN = 10;
export const DURATION_MAX = 500;

// GM Drums preset (standard General MIDI drum mapping)
export const PRESET_GM_DRUMS = {
  id: 'gm-drums',
  name: 'GM Drums (Channel 10)',
  instruments: [
    { label: 'HH', name: 'Hi-Hat', channel: 10, note: 42, velocity: 100, duration: 20 },
    { label: 'SN', name: 'Snare', channel: 10, note: 38, velocity: 100, duration: 20 },
    { label: 'KD', name: 'Kick', channel: 10, note: 36, velocity: 100, duration: 20 },
  ]
};

// Roland TR-6S preset (uses GM standard mappings)
export const PRESET_TR6S = {
  id: 'tr-6s',
  name: 'Roland TR-6S',
  instruments: [
    { label: 'HH', name: 'Hi-Hat', channel: 10, note: 42, velocity: 100, duration: 20 },
    { label: 'SN', name: 'Snare', channel: 10, note: 38, velocity: 100, duration: 20 },
    { label: 'KD', name: 'Kick', channel: 10, note: 36, velocity: 100, duration: 20 },
  ]
};

// Roland TR-8S preset (uses GM standard mappings by default)
export const PRESET_TR8S = {
  id: 'tr-8s',
  name: 'Roland TR-8S',
  instruments: [
    { label: 'HH', name: 'Hi-Hat', channel: 10, note: 42, velocity: 100, duration: 20 },
    { label: 'SN', name: 'Snare', channel: 10, note: 38, velocity: 100, duration: 20 },
    { label: 'KD', name: 'Kick', channel: 10, note: 36, velocity: 100, duration: 20 },
  ]
};

// Array of all available presets
export const PRESETS = [PRESET_GM_DRUMS, PRESET_TR6S, PRESET_TR8S];

// Default preset to use when no settings exist
export const DEFAULT_PRESET = PRESET_GM_DRUMS;
