import { theme } from '../../theme';

export function PermissionRequest({ onRequestAccess }) {
  return (
    <div
      style={{
        fontFamily: theme.typography.fontFamily.base,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: theme.spacing.xl }}>Drum Sequencer</h1>
        <button
          onClick={onRequestAccess}
          style={{
            padding: theme.buttons.size.padding,
            fontSize: theme.buttons.size.fontSize,
            fontWeight: theme.buttons.size.fontWeight,
            cursor: 'pointer',
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.colors.primary}`,
            background: theme.colors.primary,
            color: theme.colors.text.white,
          }}
        >
          Request MIDI Access
        </button>
      </div>
    </div>
  );
}
