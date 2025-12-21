import { theme } from '../../theme';
import { ViewToggle } from './ViewToggle';
import { PlaybackControls } from './PlaybackControls';

export function Footer({
  activeView,
  onViewChange,
  isPlaying,
  selectedOutput,
  onTogglePlayback,
}) {
  return (
    <footer
      style={{
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
        background: theme.colors.bg.secondary,
        borderTop: `1px solid ${theme.colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ViewToggle
        activeView={activeView}
        onViewChange={onViewChange}
        isPlaying={isPlaying}
      />
      <PlaybackControls
        isPlaying={isPlaying}
        selectedOutput={selectedOutput}
        onTogglePlayback={onTogglePlayback}
      />
      {/* Spacer for balance */}
      <div style={{ width: '200px' }} />
    </footer>
  );
}
