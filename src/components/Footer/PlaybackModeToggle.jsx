import { theme } from '../../theme';

export function PlaybackModeToggle({ playbackMode, onToggle }) {
  return (
    <div style={{ display: 'flex', gap: '2px', minWidth: '200px' }}>
      <button
        onClick={onToggle}
        style={{
          flex: 1,
          padding: theme.buttons.size.padding,
          fontSize: theme.buttons.size.fontSize,
          fontWeight: theme.buttons.size.fontWeight,
          background: playbackMode === 'user' ? theme.colors.primary : theme.colors.bg.tertiary,
          color: playbackMode === 'user' ? 'white' : theme.colors.text.primary,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: `${theme.borderRadius.base} 0 0 ${theme.borderRadius.base}`,
          cursor: 'pointer',
          transition: `all ${theme.transitions.base}`,
        }}
        title="Play your sequence"
      >
        Your
      </button>
      <button
        onClick={onToggle}
        style={{
          flex: 1,
          padding: theme.buttons.size.padding,
          fontSize: theme.buttons.size.fontSize,
          fontWeight: theme.buttons.size.fontWeight,
          background: playbackMode === 'hidden' ? theme.colors.primary : theme.colors.bg.tertiary,
          color: playbackMode === 'hidden' ? 'white' : theme.colors.text.primary,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: `0 ${theme.borderRadius.base} ${theme.borderRadius.base} 0`,
          cursor: 'pointer',
          transition: `all ${theme.transitions.base}`,
        }}
        title="Play hidden sequence"
      >
        Hidden
      </button>
    </div>
  );
}
