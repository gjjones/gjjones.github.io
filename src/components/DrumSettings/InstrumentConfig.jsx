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
 * Displays inputs for channel, note, velocity, duration with a test button
 */
export function InstrumentConfig({ instrument, index, onChange, onTest, disabled }) {
  const handleChange = (field, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onChange(index, { [field]: numValue });
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr 1fr 1fr 1fr auto',
      gap: theme.spacing.md,
      alignItems: 'center',
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      background: theme.colors.bg.secondary,
      borderRadius: theme.borderRadius.sm,
    }}>
      {/* Instrument Label */}
      <div style={{
        fontWeight: theme.typography.fontWeight.semibold,
        fontSize: theme.typography.fontSize.base,
      }}>
        {instrument.label}
        <div style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.secondary,
          fontWeight: theme.typography.fontWeight.normal,
        }}>
          {instrument.name}
        </div>
      </div>

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

      {/* Test Button */}
      <button
        onClick={onTest}
        disabled={disabled}
        style={{
          padding: theme.buttons.size.padding,
          fontSize: theme.buttons.size.fontSize,
          fontWeight: theme.buttons.size.fontWeight,
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: theme.borderRadius.sm,
          border: `1px solid ${theme.colors.border.medium}`,
          background: disabled ? theme.colors.bg.secondary : theme.colors.primary,
          color: disabled ? theme.colors.text.secondary : theme.colors.text.white,
          opacity: disabled ? 0.5 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        Test
      </button>
    </div>
  );
}
