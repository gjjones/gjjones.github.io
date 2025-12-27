import { theme } from '../../theme';
import {
  MIDI_CHANNEL_MIN,
  MIDI_CHANNEL_MAX,
  MIDI_NOTE_MIN,
  MIDI_NOTE_MAX,
  VELOCITY_MIN,
  VELOCITY_MAX,
  DURATION_MIN,
  DURATION_MAX
} from '../../constants/drumPresets';

/**
 * Individual instrument configuration row component
 * Supports both MIDI and audio sample configuration
 */
export function InstrumentConfig({ instrument, index, onChange, onTest, onSampleLoad, audioBuffer, disabled }) {
  const handleChange = (field, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onChange(index, { [field]: numValue });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onChange(index, { type: newType });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onSampleLoad(file);
    }
  };

  const isSampleType = instrument.type === 'sample';
  const canTest = isSampleType ? !!audioBuffer : !disabled;

  return (
    <div style={{
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      background: theme.colors.bg.secondary,
      borderRadius: theme.borderRadius.sm,
    }}>
      {/* Header Row: Label, Type Selector, Test Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
      }}>
        <div style={{
          fontWeight: theme.typography.fontWeight.semibold,
          fontSize: theme.typography.fontSize.base,
        }}>
          {instrument.label}
          <span style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.fontWeight.normal,
            marginLeft: theme.spacing.sm,
          }}>
            {instrument.name}
          </span>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.md, alignItems: 'center' }}>
          {/* Type Selector */}
          <select
            value={instrument.type || 'midi'}
            onChange={handleTypeChange}
            style={{
              padding: theme.spacing.sm,
              fontSize: theme.typography.fontSize.sm,
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.sm,
            }}
          >
            <option value="midi">MIDI</option>
            <option value="sample">Sample</option>
          </select>

          {/* Test Button */}
          <button
            onClick={onTest}
            disabled={!canTest}
            style={{
              padding: theme.buttons.size.padding,
              fontSize: theme.buttons.size.fontSize,
              fontWeight: theme.buttons.size.fontWeight,
              cursor: !canTest ? 'not-allowed' : 'pointer',
              borderRadius: theme.borderRadius.sm,
              border: `1px solid ${theme.colors.border.medium}`,
              background: !canTest ? theme.colors.bg.secondary : theme.colors.primary,
              color: !canTest ? theme.colors.text.secondary : theme.colors.text.white,
              opacity: !canTest ? 0.5 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            Test
          </button>
        </div>
      </div>

      {/* Configuration Row: Conditional based on type */}
      {isSampleType ? (
        /* Sample Configuration */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: theme.spacing.md,
          alignItems: 'end',
        }}>
          {/* Sample File Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '2px',
            }}>
              Audio Sample
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.sm,
              }}
            />
            {instrument.sampleUrl && (
              <div style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.secondary,
                marginTop: '2px',
              }}>
                {instrument.sampleUrl}
              </div>
            )}
            {audioBuffer && (
              <div style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.success,
                marginTop: '2px',
              }}>
                ✓ Sample loaded ({audioBuffer.duration.toFixed(2)}s)
              </div>
            )}
          </div>

          {/* Velocity Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '2px',
            }}>
              Velocity
            </label>
            <input
              type="number"
              min={VELOCITY_MIN}
              max={VELOCITY_MAX}
              value={instrument.velocity || 100}
              onChange={(e) => handleChange('velocity', e.target.value)}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.sm,
              }}
            />
          </div>
        </div>
      ) : (
        /* MIDI Configuration */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: theme.spacing.md,
        }}>
          {/* Channel Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '2px',
            }}>
              Channel
            </label>
            <input
              type="number"
              min={MIDI_CHANNEL_MIN}
              max={MIDI_CHANNEL_MAX}
              value={instrument.channel}
              onChange={(e) => handleChange('channel', e.target.value)}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.sm,
              }}
            />
          </div>

          {/* Note Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '2px',
            }}>
              Note
            </label>
            <input
              type="number"
              min={MIDI_NOTE_MIN}
              max={MIDI_NOTE_MAX}
              value={instrument.note}
              onChange={(e) => handleChange('note', e.target.value)}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.sm,
              }}
            />
          </div>

          {/* Velocity Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '2px',
            }}>
              Velocity
            </label>
            <input
              type="number"
              min={VELOCITY_MIN}
              max={VELOCITY_MAX}
              value={instrument.velocity}
              onChange={(e) => handleChange('velocity', e.target.value)}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.sm,
              }}
            />
          </div>

          {/* Duration Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
              marginBottom: '2px',
            }}>
              Duration (ms)
            </label>
            <input
              type="number"
              min={DURATION_MIN}
              max={DURATION_MAX}
              value={instrument.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.sm,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
