import { theme } from '../../theme';

/**
 * Settings button component for toggling drum MIDI settings view
 */
export function SettingsButton({ onClick, isActive, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        fontSize: theme.typography.fontSize.base,
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: theme.borderRadius.sm,
        border: `2px solid ${isActive ? theme.colors.primary : theme.colors.text.secondary}`,
        background: isActive ? theme.colors.primary : theme.colors.bg.main,
        color: isActive ? theme.colors.text.white : theme.colors.text.primary,
        fontWeight: theme.typography.fontWeight.medium,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      ⚙ Settings
    </button>
  );
}
