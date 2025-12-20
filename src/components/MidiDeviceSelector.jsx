export function MidiDeviceSelector({
  outputs,
  selectedOutput,
  onSelectOutputDevice,
  permissionStatus,
  onRequestAccess
}) {
  // If permission hasn't been granted, show request button
  if (permissionStatus !== 'granted') {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={onRequestAccess}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #0066cc',
            background: '#0066cc',
            color: 'white',
            fontWeight: '500',
          }}
        >
          Request MIDI Access
        </button>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Click to grant MIDI device access
        </p>
      </div>
    );
  }

  // Show device selector if permission granted
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor="midi-output-select"
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '500',
          fontSize: '0.875rem',
        }}
      >
        Select MIDI Device:
      </label>
      <select
        id="midi-output-select"
        value={selectedOutput?.id || ''}
        onChange={(e) => onSelectOutputDevice(e.target.value)}
        disabled={outputs.length === 0}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          background: outputs.length === 0 ? '#f5f5f5' : 'white',
          cursor: outputs.length === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        <option value="">
          {outputs.length === 0 ? 'No MIDI devices found' : 'Select a device...'}
        </option>
        {outputs.map((output) => (
          <option key={output.id} value={output.id}>
            {output.manufacturer && output.name
              ? `${output.manufacturer} - ${output.name}`
              : output.name || output.id}
          </option>
        ))}
      </select>
      {outputs.length === 0 && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          No MIDI devices detected. Connect a device and try again.
        </p>
      )}
    </div>
  );
}
