export function MidiStatus({ selectedOutput, error, isSupported }) {
  // Show error if browser doesn't support MIDI
  if (!isSupported) {
    return (
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: '#fee',
          border: '1px solid #fcc',
          marginBottom: '1rem',
        }}
      >
        <strong style={{ color: '#c00' }}>Browser Not Supported</strong>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#800' }}>
          {error}
        </p>
      </div>
    );
  }

  // Show general errors
  if (error) {
    return (
      <div
        style={{
          padding: '1rem',
          borderRadius: '4px',
          background: '#fee',
          border: '1px solid #fcc',
          marginBottom: '1rem',
        }}
      >
        <strong style={{ color: '#c00' }}>Error</strong>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#800' }}>
          {error}
        </p>
      </div>
    );
  }

  const getStatusColor = () => {
    if (selectedOutput && selectedOutput.state === 'connected') {
      return '#0a0';
    }
    return '#999';
  };

  const getStatusText = () => {
    if (selectedOutput && selectedOutput.state === 'connected') {
      return 'Connected';
    }
    return 'Disconnected';
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          borderRadius: '4px',
          background: '#f9f9f9',
          border: '1px solid #e0e0e0',
        }}
      >
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: getStatusColor(),
            display: 'inline-block',
          }}
        />
        <strong style={{ fontSize: '0.875rem' }}>{getStatusText()}</strong>
        {selectedOutput && (
          <span style={{ fontSize: '0.875rem', color: '#666' }}>
            - {selectedOutput.manufacturer && selectedOutput.name
              ? `${selectedOutput.manufacturer} ${selectedOutput.name}`
              : selectedOutput.name || 'Unknown Device'}
          </span>
        )}
      </div>
    </div>
  );
}
