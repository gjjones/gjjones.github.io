import { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { PRESETS } from '../../constants/drumPresets';
import { InstrumentConfig } from './InstrumentConfig';

/**
 * Main drum MIDI settings component
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
  onSelectOutputDevice
}) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isDirty, setIsDirty] = useState(false);

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

  const handleTest = (instrument) => {
    if (selectedOutput && selectedOutput.state === 'connected') {
      sendNoteTrigger(instrument.channel, instrument.note, instrument.velocity, instrument.duration);
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
            <span style={{ color: '#22c55e' }}>●</span>
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
            onTest={() => handleTest(instrument)}
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
