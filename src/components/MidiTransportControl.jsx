import { useState, useEffect } from 'react';

export function MidiTransportControl({ selectedOutput, onStart, onStop, onTriggerNote }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset playing state when output device disconnects
  useEffect(() => {
    if (!selectedOutput || selectedOutput.state !== 'connected') {
      setIsPlaying(false);
    }
  }, [selectedOutput]);

  // Only show if output device is connected
  if (!selectedOutput || selectedOutput.state !== 'connected') {
    return null;
  }

  const handleToggle = () => {
    if (isPlaying) {
      if (onStop()) {
        setIsPlaying(false);
      }
    } else {
      if (onStart()) {
        setIsPlaying(true);
      }
    }
  };

  const handleTrigger = () => {
    // Trigger Ch:10 Note:36 (C2) Vel:80
    onTriggerNote(10, 36, 80);
  };

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '4px',
        background: '#f9f9f9',
        border: '1px solid #e0e0e0',
        marginTop: '1rem',
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: '1rem', marginBottom: '1rem' }}>
        Sequencer Control
      </h3>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleToggle}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: `1px solid ${isPlaying ? '#c00' : '#0a0'}`,
            background: isPlaying ? '#c00' : '#0a0',
            color: 'white',
            fontWeight: '500',
            minWidth: '150px',
          }}
        >
          {isPlaying ? '■ Stop' : '▶ Start'} Sequencer
        </button>

        <button
          onClick={handleTrigger}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #06c',
            background: '#06c',
            color: 'white',
            fontWeight: '500',
          }}
        >
          Trigger Note
        </button>
      </div>

      <p
        style={{
          marginTop: '0.75rem',
          marginBottom: 0,
          fontSize: '0.75rem',
          color: '#666',
        }}
      >
        Status: {isPlaying ? 'Playing' : 'Stopped'} | Device: {selectedOutput.name || 'Unknown'}
      </p>
    </div>
  );
}
