import { theme } from '../../theme';

export function PlaybackControls({ isPlaying, selectedOutput, onTogglePlayback }) {
  const isDisabled = !selectedOutput || selectedOutput.state !== 'connected';

  return (
    <button
      onClick={onTogglePlayback}
      disabled={isDisabled}
      style={{
        padding: theme.buttons.size.padding,
        fontSize: theme.buttons.size.fontSize,
        fontWeight: theme.buttons.size.fontWeight,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        borderRadius: theme.borderRadius.sm,
        border: `2px solid ${isPlaying ? theme.colors.danger : theme.colors.success}`,
        background: isPlaying ? theme.colors.danger : theme.colors.success,
        color: theme.colors.text.white,
        minWidth: '200px',
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      {isPlaying ? '■ Stop' : '▶ Start'}
    </button>
  );
}
