import { theme } from '../theme';

export function SequencerControls({
  activeView,
  onViewChange,
  bpm,
  onBpmChange,
  isPlaying,
  onStart,
  onStop,
}) {
  const handleBpmChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 40 && value <= 240) {
      onBpmChange(value);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      onStop();
    } else {
      onStart();
    }
  };

  const handleViewToggle = () => {
    // Only allow view change when not playing
    if (!isPlaying) {
      onViewChange(activeView === 'user' ? 'test' : 'user');
    }
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
        Sequencer Controls
      </h3>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Playback control */}
        <button
          onClick={handleToggle}
          style={{
            padding: theme.buttons.size.padding,
            fontSize: theme.buttons.size.fontSize,
            fontWeight: theme.buttons.size.fontWeight,
            cursor: 'pointer',
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${isPlaying ? theme.colors.danger : theme.colors.success}`,
            background: isPlaying ? theme.colors.danger : theme.colors.success,
            color: 'white',
            minWidth: '120px',
          }}
        >
          {isPlaying ? '■ Stop' : '▶ Start'}
        </button>

        {/* View toggle */}
        <button
          onClick={handleViewToggle}
          disabled={isPlaying}
          style={{
            padding: theme.buttons.size.padding,
            fontSize: theme.buttons.size.fontSize,
            fontWeight: theme.buttons.size.fontWeight,
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.colors.primary}`,
            background: isPlaying ? theme.colors.border.medium : theme.colors.primary,
            color: 'white',
            opacity: isPlaying ? 0.5 : 1,
          }}
          title={isPlaying ? 'Stop playback to switch views' : 'Toggle between test pattern and your pattern'}
        >
          {activeView === 'user' ? 'View: My Pattern' : 'View: Test Pattern'}
        </button>

        {/* BPM control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="bpm-input" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
            BPM:
          </label>
          <input
            id="bpm-input"
            type="number"
            min="40"
            max="240"
            value={bpm}
            onChange={handleBpmChange}
            style={{
              width: '70px',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <p
        style={{
          marginTop: '0.75rem',
          marginBottom: 0,
          fontSize: '0.75rem',
          color: '#666',
        }}
      >
        Status: {isPlaying ? 'Playing' : 'Stopped'} | View: {activeView === 'user' ? 'My Pattern' : 'Test Pattern'} | BPM: {bpm}
      </p>
    </div>
  );
}
