import { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { PRESETS } from '../../constants/drumPresets';
import { InstrumentConfig } from './InstrumentConfig';
import { useAudioSamplePlayer } from '../../hooks/useAudioSamplePlayer';
import { useTimingClock } from '../../hooks/useTimingClock';

/**
 * Main drum settings component (MIDI and audio samples)
 * Provides preset selection, per-instrument configuration, and test functionality
 */
export function DrumSettings({
  instruments,
  updateInstrument,
  loadPreset,
  resetToDefault,
  onClose,
  sendNoteTrigger,
  selectedOutput,
  outputs,
  onSelectOutputDevice,
  setAudioBuffer,
  getAudioBuffer,
}) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Initialize timing clock for sample playback testing
  const timingClock = useTimingClock({ bpm: 120, division: 4, totalSteps: 16 });

  // Initialize sample player for testing
  const samplePlayer = useAudioSamplePlayer({
    audioContext: timingClock.audioContext,
  });

  // Detect which preset matches current instruments on mount only
  useEffect(() => {
    const matchingPreset = PRESETS.find(preset => {
      return preset.instruments.every((presetInst, index) => {
        const currentInst = instruments[index];
        return (
          presetInst.channel === currentInst.channel &&
          presetInst.note === currentInst.note &&
          presetInst.velocity === currentInst.velocity &&
          presetInst.duration === currentInst.duration
        );
      });
    });

    if (matchingPreset) {
      setSelectedPreset(matchingPreset.id);
    } else {
      setSelectedPreset('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Auto-load samples when preset with sampleUrls is selected
  useEffect(() => {
    const loadPresetSamples = async () => {
      const needsSampleLoading = instruments.some((inst, index) => {
        return inst.type === 'sample' && inst.sampleUrl && !getAudioBuffer(index);
      });

      if (needsSampleLoading && samplePlayer.loadSample) {
        const loadPromises = instruments.map(async (instrument, index) => {
          if (instrument.type === 'sample' && instrument.sampleUrl && !getAudioBuffer(index)) {
            try {
              const audioBuffer = await samplePlayer.loadSample(instrument.sampleUrl);
              setAudioBuffer(index, audioBuffer);
            } catch (error) {
              console.error(`[DrumSettings] Failed to load sample for ${instrument.name}:`, error);
            }
          }
        });
        await Promise.all(loadPromises);
      }
    };

    loadPresetSamples();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instruments]);

  const handlePresetChange = (e) => {
    const presetId = e.target.value;
    setSelectedPreset(presetId);
    if (presetId) {
      loadPreset(presetId);
      setIsDirty(false);
    }
  };

  const handleInstrumentChange = (index, updates) => {
    updateInstrument(index, updates);
    setIsDirty(true);
    setSelectedPreset(''); // Clear preset selection when manually editing
  };

  const handleReset = () => {
    resetToDefault();
    setSelectedPreset('');
    setIsDirty(false);
  };

  const handleTest = (instrument, index) => {
    if (instrument.type === 'sample') {
      // Test sample playback
      const audioBuffer = getAudioBuffer(index);
      if (audioBuffer && samplePlayer && timingClock.audioContext) {
        const now = timingClock.audioContext.currentTime;
        samplePlayer.scheduleSample(audioBuffer, now, instrument.velocity || 100);
      }
    } else {
      // Test MIDI playback
      if (selectedOutput && selectedOutput.state === 'connected') {
        sendNoteTrigger(instrument.channel, instrument.note, instrument.velocity, instrument.duration);
      }
    }
  };

  const handleSampleLoad = async (index, file) => {
    try {
      const audioBuffer = await samplePlayer.loadSampleFromFile(file);
      setAudioBuffer(index, audioBuffer);
      setIsDirty(true);
      setSelectedPreset(''); // Clear preset when loading samples
    } catch (error) {
      console.error('Failed to load sample:', error);
      alert('Failed to load audio sample. Please try a different file.');
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: theme.spacing.xl,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <h2 style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          margin: 0,
        }}>
          Drum MIDI Settings
        </h2>
        <button
          onClick={onClose}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            fontSize: theme.typography.fontSize.base,
            cursor: 'pointer',
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.colors.border.medium}`,
            background: theme.colors.bg.main,
            color: theme.colors.text.primary,
          }}
        >
          Close
        </button>
      </div>

      {/* MIDI Device Selection */}
      <div style={{ marginBottom: theme.spacing.xl }}>
        <label style={{
          display: 'block',
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          marginBottom: theme.spacing.sm,
        }}>
          MIDI Output Device:
        </label>
        <select
          value={selectedOutput?.id || ''}
          onChange={(e) => onSelectOutputDevice(e.target.value)}
          disabled={!outputs || outputs.length === 0}
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            fontSize: theme.typography.fontSize.base,
            border: `1px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          {(!outputs || outputs.length === 0) ? (
            <option value="">No devices found</option>
          ) : (
            <>
              <option value="">Select device...</option>
              {outputs.map((output) => {
                const displayName = output.manufacturer
                  ? `${output.manufacturer} - ${output.name || output.id}`
                  : (output.name || output.id);
                return (
                  <option key={output.id} value={output.id}>
                    {displayName}
                  </option>
                );
              })}
            </>
          )}
        </select>
        {/* Connection status indicator inline */}
        {selectedOutput && selectedOutput.state === 'connected' && (
          <div style={{
            marginTop: theme.spacing.sm,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
          }}>
            <span style={{ color: theme.colors.success }}>●</span>
            <span>Connected</span>
          </div>
        )}
      </div>

      {/* Preset Selector */}
      <div style={{ marginBottom: theme.spacing.xl }}>
        <label style={{
          display: 'block',
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          marginBottom: theme.spacing.sm,
        }}>
          Preset:
        </label>
        <select
          value={selectedPreset}
          onChange={handlePresetChange}
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            fontSize: theme.typography.fontSize.base,
            border: `1px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          <option value="">Custom</option>
          {PRESETS.map(preset => (
            <option key={preset.id} value={preset.id}>{preset.name}</option>
          ))}
        </select>
      </div>

      {/* Instrument Configurations */}
      <div style={{ marginBottom: theme.spacing.xl }}>
        {instruments.map((instrument, index) => (
          <InstrumentConfig
            key={instrument.label}
            instrument={instrument}
            index={index}
            onChange={handleInstrumentChange}
            onTest={() => handleTest(instrument, index)}
            onSampleLoad={(file) => handleSampleLoad(index, file)}
            audioBuffer={getAudioBuffer(index)}
            disabled={!selectedOutput || selectedOutput.state !== 'connected'}
          />
        ))}
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.md,
        justifyContent: 'flex-end',
      }}>
        <button
          onClick={handleReset}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            fontSize: theme.typography.fontSize.base,
            cursor: 'pointer',
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.colors.border.medium}`,
            background: theme.colors.bg.main,
            color: theme.colors.text.primary,
          }}
        >
          Reset to Default
        </button>
      </div>

      {isDirty && (
        <div style={{
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
          background: theme.colors.bg.secondary,
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}>
          Settings are automatically saved
        </div>
      )}
    </div>
  );
}
