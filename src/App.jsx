import { useMidi } from './hooks/useMidi';
import { MidiDeviceSelector } from './components/MidiDeviceSelector';
import { MidiStatus } from './components/MidiStatus';
import { MidiTransportControl } from './components/MidiTransportControl';

function App() {
  const {
    isSupported,
    permissionStatus,
    outputs,
    selectedOutput,
    error,
    requestAccess,
    selectOutputDevice,
    sendStart,
    sendStop,
  } = useMidi();

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      <h1 style={{ marginBottom: '0.5rem' }}>MIDI Device Manager</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Connect and control your MIDI devices using the Web MIDI API
      </p>

      <MidiStatus
        selectedOutput={selectedOutput}
        error={error}
        isSupported={isSupported}
      />

      <MidiDeviceSelector
        outputs={outputs}
        selectedOutput={selectedOutput}
        onSelectOutputDevice={selectOutputDevice}
        permissionStatus={permissionStatus}
        onRequestAccess={requestAccess}
      />

      <MidiTransportControl
        selectedOutput={selectedOutput}
        onStart={sendStart}
        onStop={sendStop}
      />

      {/* Info section */}
      {permissionStatus === 'granted' && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f0f8ff',
            border: '1px solid #b3d9ff',
            borderRadius: '4px',
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Quick Info</h3>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
            <li>Available devices: {outputs.length}</li>
            <li>Selected device: {selectedOutput ? selectedOutput.name : 'None'}</li>
            <li>
              Status: {selectedOutput && selectedOutput.state === 'connected' ? 'Connected' : 'Disconnected'}
            </li>
          </ul>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#666' }}>
            Select a device to enable sequencer transport controls.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
