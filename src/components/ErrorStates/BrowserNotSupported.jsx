import { theme } from '../../theme';

export function BrowserNotSupported({ error }) {
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
      <div
        style={{
          padding: theme.spacing.xl,
          borderRadius: theme.borderRadius.md,
          background: theme.colors.bg.error,
          border: `1px solid ${theme.colors.border.error}`,
          maxWidth: '500px',
        }}
      >
        <strong style={{ color: theme.colors.text.danger, fontSize: theme.typography.fontSize.xl }}>
          Browser Not Supported
        </strong>
        <p style={{ margin: `${theme.spacing.md} 0 0 0`, color: theme.colors.text.light }}>
          {error || 'Your browser does not support the Web MIDI API. Please use a modern browser like Chrome, Edge, or Opera.'}
        </p>
      </div>
    </div>
  );
}
