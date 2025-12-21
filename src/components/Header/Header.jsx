import { theme } from '../../theme';
import { MidiDeviceSelector } from './MidiDeviceSelector';
import { ConnectionStatus } from './ConnectionStatus';
import { BpmControl } from './BpmControl';

export function Header({ outputs, selectedOutput, onSelectOutputDevice, bpm, onBpmChange }) {
  return (
    <header
      style={{
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        background: theme.colors.bg.secondary,
        borderBottom: `1px solid ${theme.colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.lg,
        flexWrap: 'wrap',
      }}
    >
      <MidiDeviceSelector
        outputs={outputs}
        selectedOutput={selectedOutput}
        onSelectOutputDevice={onSelectOutputDevice}
      />
      <ConnectionStatus selectedOutput={selectedOutput} />
      <BpmControl bpm={bpm} onBpmChange={onBpmChange} />
    </header>
  );
}
