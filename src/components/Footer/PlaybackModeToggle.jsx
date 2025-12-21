import { theme } from '../../theme';

export function PlaybackModeToggle({ playbackMode, onToggle, hasSubmitted }) {
  // Don't show after submit
  if (hasSubmitted) {
    return <div style={{ width: '200px' }} />; // Spacer for balance
  }

  return (
    <div style={{ display: 'flex', gap: '2px', minWidth: '200px' }}>
      <button
        onClick={onToggle}
        style={{
          flex: 1,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          background: playbackMode === 'user' ? theme.colors.primary : theme.colors.bg.tertiary,
          color: playbackMode === 'user' ? 'white' : theme.colors.text.primary,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: `${theme.borderRadius.base} 0 0 ${theme.borderRadius.base}`,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        title="Play your sequence"
      >
        Your
      </button>
      <button
        onClick={onToggle}
        style={{
          flex: 1,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          background: playbackMode === 'hidden' ? theme.colors.primary : theme.colors.bg.tertiary,
          color: playbackMode === 'hidden' ? 'white' : theme.colors.text.primary,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: `0 ${theme.borderRadius.base} ${theme.borderRadius.base} 0`,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        title="Play hidden sequence"
      >
        Hidden
      </button>
    </div>
  );
}
