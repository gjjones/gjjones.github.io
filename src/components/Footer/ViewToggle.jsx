import { theme } from '../../theme';

export function ViewToggle({ activeView, onViewChange, isPlaying }) {
  return (
    <div style={{ display: 'flex', gap: theme.spacing.sm }}>
      <button
        onClick={() => onViewChange('user')}
        style={{
          padding: `0.75rem ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.base,
          cursor: 'pointer',
          borderRadius: theme.borderRadius.sm,
          border: `2px solid ${activeView === 'user' ? theme.colors.primary : theme.colors.text.secondary}`,
          background: activeView === 'user' ? theme.colors.primary : theme.colors.bg.main,
          color: activeView === 'user' ? theme.colors.text.white : theme.colors.text.primary,
          fontWeight: theme.typography.fontWeight.medium,
        }}
        title={isPlaying ? 'Show your pattern (restarts from beginning)' : 'Show your pattern'}
      >
        👁 Show
      </button>
      <button
        onClick={() => onViewChange('test')}
        style={{
          padding: `0.75rem ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.base,
          cursor: 'pointer',
          borderRadius: theme.borderRadius.sm,
          border: `2px solid ${activeView === 'test' ? theme.colors.primary : theme.colors.text.secondary}`,
          background: activeView === 'test' ? theme.colors.primary : theme.colors.bg.main,
          color: activeView === 'test' ? theme.colors.text.white : theme.colors.text.primary,
          fontWeight: theme.typography.fontWeight.medium,
        }}
        title={isPlaying ? 'Hide test pattern (restarts from beginning)' : 'Hide test pattern'}
      >
        👁‍🗨 Hide
      </button>
    </div>
  );
}
