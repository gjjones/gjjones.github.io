import { theme } from '../../theme';
import { MidiDeviceSelector } from './MidiDeviceSelector';
import { ConnectionStatus } from './ConnectionStatus';
import { BpmControl } from './BpmControl';

export function Header({ outputs, selectedOutput, onSelectOutputDevice, bpm, onBpmChange, currentQuestionIndex, totalQuestions }) {
  return (
    <header
      style={{
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        background: theme.colors.bg.secondary,
        borderBottom: `1px solid ${theme.colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing.lg,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg, flexWrap: 'wrap' }}>
        <MidiDeviceSelector
          outputs={outputs}
          selectedOutput={selectedOutput}
          onSelectOutputDevice={onSelectOutputDevice}
        />
        <ConnectionStatus selectedOutput={selectedOutput} />
        <BpmControl bpm={bpm} onBpmChange={onBpmChange} />
      </div>

      {currentQuestionIndex !== undefined && totalQuestions && (
        <div
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.primary,
            letterSpacing: '0.05em',
          }}
        >
          SESSION {currentQuestionIndex + 1} OF {totalQuestions}
        </div>
      )}
    </header>
  );
}
