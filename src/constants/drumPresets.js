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
    { label: 'HH', name: 'Hi-Hat', type: 'midi', channel: 10, note: 42, velocity: 100, duration: 20 },
    { label: 'OH', name: 'Open Hi-Hat', type: 'midi', channel: 10, note: 46, velocity: 100, duration: 20 },
    { label: 'SN', name: 'Snare', type: 'midi', channel: 10, note: 38, velocity: 100, duration: 20 },
    { label: 'KD', name: 'Kick', type: 'midi', channel: 10, note: 36, velocity: 100, duration: 20 },
    { label: 'HT', name: 'High Tom', type: 'midi', channel: 10, note: 50, velocity: 100, duration: 20 },
    { label: 'MT', name: 'Mid Tom', type: 'midi', channel: 10, note: 47, velocity: 100, duration: 20 },
    { label: 'LT', name: 'Low Tom', type: 'midi', channel: 10, note: 45, velocity: 100, duration: 20 },
  ]
};

// Roland TR-6S preset (uses GM standard mappings)
export const PRESET_TR6S = {
  id: 'tr-6s',
  name: 'Roland TR-6S',
  instruments: [
    { label: 'HH', name: 'Hi-Hat', type: 'midi', channel: 10, note: 42, velocity: 100, duration: 20 },
    { label: 'OH', name: 'Open Hi-Hat', type: 'midi', channel: 10, note: 46, velocity: 100, duration: 20 },
    { label: 'SN', name: 'Snare', type: 'midi', channel: 10, note: 38, velocity: 100, duration: 20 },
    { label: 'KD', name: 'Kick', type: 'midi', channel: 10, note: 36, velocity: 100, duration: 20 },
    { label: 'HT', name: 'High Tom', type: 'midi', channel: 10, note: 50, velocity: 100, duration: 20 },
    { label: 'MT', name: 'Mid Tom', type: 'midi', channel: 10, note: 47, velocity: 100, duration: 20 },
    { label: 'LT', name: 'Low Tom', type: 'midi', channel: 10, note: 45, velocity: 100, duration: 20 },
  ]
};

// Roland TR-8S preset (uses GM standard mappings by default)
export const PRESET_TR8S = {
  id: 'tr-8s',
  name: 'Roland TR-8S',
  instruments: [
    { label: 'HH', name: 'Hi-Hat', type: 'midi', channel: 10, note: 42, velocity: 100, duration: 20 },
    { label: 'OH', name: 'Open Hi-Hat', type: 'midi', channel: 10, note: 46, velocity: 100, duration: 20 },
    { label: 'SN', name: 'Snare', type: 'midi', channel: 10, note: 38, velocity: 100, duration: 20 },
    { label: 'KD', name: 'Kick', type: 'midi', channel: 10, note: 36, velocity: 100, duration: 20 },
    { label: 'HT', name: 'High Tom', type: 'midi', channel: 10, note: 50, velocity: 100, duration: 20 },
    { label: 'MT', name: 'Mid Tom', type: 'midi', channel: 10, note: 47, velocity: 100, duration: 20 },
    { label: 'LT', name: 'Low Tom', type: 'midi', channel: 10, note: 45, velocity: 100, duration: 20 },
  ]
};

// 808 Sample Kit preset (audio sample-based playback)
export const PRESET_808_KIT = {
  id: '808-kit',
  name: '808 Sample Kit',
  instruments: [
    {
      label: 'HH',
      name: 'Hi-Hat',
      type: 'sample',
      channel: 10,
      note: 42,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-hihat.wav'
    },
    {
      label: 'OH',
      name: 'Open Hi-Hat',
      type: 'sample',
      channel: 10,
      note: 46,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-openhat.wav'
    },
    {
      label: 'SN',
      name: 'Snare',
      type: 'sample',
      channel: 10,
      note: 38,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-snare.wav'
    },
    {
      label: 'KD',
      name: 'Kick',
      type: 'sample',
      channel: 10,
      note: 36,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-kick.wav'
    },
    {
      label: 'HT',
      name: 'High Tom',
      type: 'sample',
      channel: 10,
      note: 50,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-hightom.wav'
    },
    {
      label: 'MT',
      name: 'Mid Tom',
      type: 'sample',
      channel: 10,
      note: 47,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-midtom.wav'
    },
    {
      label: 'LT',
      name: 'Low Tom',
      type: 'sample',
      channel: 10,
      note: 45,
      velocity: 100,
      duration: 20,
      sampleUrl: '/samples/808-lowtom.wav'
    },
  ]
};

// Array of all available presets
export const PRESETS = [PRESET_GM_DRUMS, PRESET_TR6S, PRESET_TR8S, PRESET_808_KIT];

// Default preset to use when no settings exist
export const DEFAULT_PRESET = PRESET_808_KIT;
