import { theme } from '../../theme';

export function MidiDeviceSelector({ outputs, selectedOutput, onSelectOutputDevice }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
      <label htmlFor="midi-select" style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
        Device:
      </label>
      <select
        id="midi-select"
        value={selectedOutput?.id || ''}
        onChange={(e) => onSelectOutputDevice(e.target.value)}
        disabled={outputs.length === 0}
        style={{
          padding: theme.spacing.sm,
          fontSize: theme.typography.fontSize.sm,
          borderRadius: theme.borderRadius.sm,
          border: `1px solid ${theme.colors.border.medium}`,
          background: outputs.length === 0 ? '#f5f5f5' : theme.colors.bg.main,
          cursor: outputs.length === 0 ? 'not-allowed' : 'pointer',
          minWidth: '200px',
        }}
      >
        <option value="">
          {outputs.length === 0 ? 'No devices found' : 'Select device...'}
        </option>
        {outputs.map((output) => (
          <option key={output.id} value={output.id}>
            {output.manufacturer && output.name
              ? `${output.manufacturer} - ${output.name}`
              : output.name || output.id}
          </option>
        ))}
      </select>
    </div>
  );
}
