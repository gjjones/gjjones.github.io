import { theme } from './theme';
import { useMidi } from './hooks/useMidi';
import { useSequencer } from './hooks/useSequencer';
import { SequencerGrid } from './components/SequencerGrid';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { BrowserNotSupported } from './components/ErrorStates/BrowserNotSupported';
import { PermissionRequest } from './components/ErrorStates/PermissionRequest';

function App() {
  const {
    isSupported,
    permissionStatus,
    outputs,
    selectedOutput,
    error,
    requestAccess,
    selectOutputDevice,
    sendNoteTrigger,
  } = useMidi();

  const {
    currentSequence,
    activeView,
    setActiveView,
    bpm,
    setBpm,
    isPlaying,
    currentStep,
    toggleStep,
    start,
    stop,
    restart,
  } = useSequencer(sendNoteTrigger);

  const handleViewChange = (newView) => {
    setActiveView(newView);
    if (isPlaying) {
      restart();
    }
  };

  const handleTogglePlayback = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  // Show error states
  if (!isSupported || error) {
    return <BrowserNotSupported error={error} />;
  }

  if (permissionStatus !== 'granted') {
    return <PermissionRequest onRequestAccess={requestAccess} />;
  }

  return (
    <div
      style={{
        fontFamily: theme.typography.fontFamily.base,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Header
        outputs={outputs}
        selectedOutput={selectedOutput}
        onSelectOutputDevice={selectOutputDevice}
        bpm={bpm}
        onBpmChange={setBpm}
      />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: theme.spacing.xl,
          overflow: 'auto',
        }}
      >
        {selectedOutput && selectedOutput.state === 'connected' ? (
          <SequencerGrid
            sequence={currentSequence}
            onToggleStep={toggleStep}
            currentStep={currentStep}
            bpm={bpm}
            isEditable={activeView === 'user'}
            hideNotes={activeView === 'test'}
          />
        ) : (
          <div style={{ textAlign: 'center', color: theme.colors.text.secondary, marginTop: theme.spacing.xl }}>
            <p style={{ fontSize: theme.typography.fontSize.lg }}>Select a MIDI device to begin</p>
          </div>
        )}
      </main>

      <Footer
        activeView={activeView}
        onViewChange={handleViewChange}
        isPlaying={isPlaying}
        selectedOutput={selectedOutput}
        onTogglePlayback={handleTogglePlayback}
      />
    </div>
  );
}

export default App;
