import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useMidiContext } from '../contexts/MidiContext';
import { getQuizById } from '../data/quizDefinitions';
import { useSequencer } from '../hooks/useSequencer';
import { useDrumSettings } from '../hooks/useDrumSettings';
import { PermissionRequest } from '../components/ErrorStates/PermissionRequest';
import { QuizComplete } from '../components/QuizComplete';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ListenMode } from '../components/ListenMode';
import { SequencerGrid } from '../components/SequencerGrid';
import { DrumSettings } from '../components/DrumSettings/DrumSettings';
import { getDifferences } from '../utils/sequenceComparison';
import { theme } from '../theme';
import { requiresMidiPermission, canPlayback } from '../utils/playbackUtils';

export function QuizRoute() {
  const { quizId } = useParams({ from: '/quiz/$quizId' });
  const navigate = useNavigate();
  const {
    permissionStatus,
    requestAccess,
    outputs,
    selectedOutput,
    selectOutputDevice,
    sendNoteTrigger,
  } = useMidiContext();

  const selectedQuiz = getQuizById(quizId);
  const [playbackMode, setPlaybackMode] = useState('hidden');
  const [showHints, setShowHints] = useState(false);
  const [viewMode, setViewMode] = useState('sequencer'); // 'sequencer' | 'settings'
  const [isMidiAvailable, setIsMidiAvailable] = useState(true);

  // Initialize drum settings
  const drumSettings = useDrumSettings();

  // Detect Web MIDI API availability
  useEffect(() => {
    const checkMidiAvailability = () => {
      const available = !!(navigator.requestMIDIAccess);
      setIsMidiAvailable(available);

      // If MIDI unavailable, suggest user switch to sample mode
      if (!available) {
        console.warn('[QuizRoute] Web MIDI API not available. Consider using sample playback mode.');
      }
    };

    checkMidiAvailability();
  }, []);

  // If invalid quiz ID, redirect to home
  useEffect(() => {
    if (!selectedQuiz) {
      navigate({ to: '/' });
    }
  }, [selectedQuiz, navigate]);

  // Initialize sequencer with fallback quiz for hook rules
  const sequencer = useSequencer(
    sendNoteTrigger,
    playbackMode,
    selectedQuiz || getQuizById('basicGrooves'),
    drumSettings.getMidiParams,
    drumSettings.getInstrument,
    drumSettings.instruments
  );

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      sequencer.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only cleanup on unmount, not when sequencer reference changes

  // Transition to completion state when quiz finishes (but stay on same route)
  useEffect(() => {
    if (sequencer.isQuizComplete) {
      sequencer.stop();
    }
  }, [sequencer.isQuizComplete, sequencer]);

  const handleTogglePlayback = () => {
    if (sequencer.isPlaying) {
      sequencer.stop();
    } else {
      sequencer.start();
    }
  };

  const handleToggleHints = () => {
    setShowHints((prev) => !prev);
  };

  const handleTogglePlaybackMode = () => {
    setPlaybackMode((prev) => {
      const newMode = prev === 'user' ? 'hidden' : 'user';
      // Auto-hide hints when viewing 'Hidden' (they're redundant when seeing the answer)
      if (newMode === 'hidden') {
        setShowHints(false);
      }
      return newMode;
    });
    // Restart happens in useEffect below to ensure sequence updates first
  };

  // Restart playback when mode changes (after sequence has updated)
  useEffect(() => {
    if (sequencer.isPlaying) {
      sequencer.restart();
    }
  }, [playbackMode]); // Restart when playbackMode changes

  const handleSubmitAnswer = () => {
    sequencer.submitAnswer();

    // Auto-show hints and switch to 'Your' view if answer is incorrect
    const differences = getDifferences(sequencer.userSequence, sequencer.currentPattern.steps);
    const isCorrect = differences.length === 0;

    if (!isCorrect) {
      setShowHints(true);
      setPlaybackMode('user'); // Show user's answer with hints for editing
    }
  };

  const handleNextQuestion = () => {
    setShowHints(false);
    setPlaybackMode('hidden');
    sequencer.goToNextQuestion();
    sequencer.stop();
    sequencer.restart();
  };

  const handleExitQuiz = () => {
    sequencer.stop();
    sequencer.exitQuiz();
    setPlaybackMode('hidden');
    setShowHints(false);
    navigate({ to: '/' });
  };

  const handleRestartQuiz = () => {
    sequencer.stop();
    sequencer.restartQuiz();
    setShowHints(false);
    setPlaybackMode('hidden');
  };

  const handleToggleSettings = () => {
    setViewMode((prev) => {
      const newMode = prev === 'settings' ? 'sequencer' : 'settings';
      // Stop playback when entering settings
      if (newMode === 'settings' && sequencer.isPlaying) {
        sequencer.stop();
      }
      return newMode;
    });
  };

  // Calculate differences for hints
  const differences = getDifferences(sequencer.userSequence, sequencer.currentPattern.steps);
  const highlightedCells = showHints ? differences : [];

  // Determine which sequence to display in the grid
  const displayedSequence = playbackMode === 'hidden' ? sequencer.currentPattern.steps : sequencer.userSequence;
  const isGridEditable = playbackMode === 'user';
  const hideNotes = playbackMode === 'hidden';

  // If invalid quiz, show nothing (redirect will happen)
  if (!selectedQuiz) {
    return null;
  }

  // Check if we have any way to play back audio
  const hasPlaybackCapability = canPlayback(selectedOutput, drumSettings.instruments, drumSettings.getAudioBuffer);

  // If quiz complete, show results
  if (sequencer.isQuizComplete) {
    return (
      <div style={{
        fontFamily: theme.typography.fontFamily.base,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Header
          selectedOutput={selectedOutput}
          bpm={sequencer.bpm}
          onBpmChange={sequencer.setBpm}
          currentQuestionIndex={undefined}
          totalQuestions={selectedQuiz.totalQuestions}
          onExit={handleExitQuiz}
        />
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: theme.spacing.xl,
          overflow: 'auto',
        }}>
          <QuizComplete
            quizResults={sequencer.quizResults}
            onRestart={handleRestartQuiz}
            onReturnToMenu={handleExitQuiz}
          />
        </main>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div style={{
      fontFamily: theme.typography.fontFamily.base,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Header
        selectedOutput={selectedOutput}
        bpm={sequencer.bpm}
        onBpmChange={sequencer.setBpm}
        currentQuestionIndex={sequencer.currentQuestionIndex}
        totalQuestions={selectedQuiz.totalQuestions}
        onExit={handleExitQuiz}
      />
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: theme.spacing.xl,
        overflow: 'auto',
      }}>
        {viewMode === 'settings' ? (
          <DrumSettings
            instruments={drumSettings.instruments}
            updateInstrument={drumSettings.updateInstrument}
            loadPreset={drumSettings.loadPreset}
            resetToDefault={drumSettings.resetToDefault}
            onClose={handleToggleSettings}
            sendNoteTrigger={sendNoteTrigger}
            selectedOutput={selectedOutput}
            outputs={outputs}
            onSelectOutputDevice={selectOutputDevice}
            setAudioBuffer={drumSettings.setAudioBuffer}
            getAudioBuffer={drumSettings.getAudioBuffer}
          />
        ) : hasPlaybackCapability ? (
          <>
            {playbackMode === 'hidden' ? (
              <ListenMode
                currentStep={sequencer.currentStep}
                totalSteps={sequencer.currentPattern.totalSteps}
                stepsPerMeasure={sequencer.currentPattern.stepsPerMeasure}
                measures={sequencer.currentPattern.measures}
                bpm={sequencer.bpm}
                getMusicalPosition={sequencer.getMusicalPosition}
              />
            ) : (
              <SequencerGrid
                sequence={displayedSequence}
                onToggleStep={sequencer.toggleStep}
                currentStep={sequencer.currentStep}
                bpm={sequencer.bpm}
                isEditable={isGridEditable}
                hideNotes={hideNotes}
                highlightedCells={highlightedCells}
                totalSteps={sequencer.currentPattern.totalSteps}
                stepsPerMeasure={sequencer.currentPattern.stepsPerMeasure}
                measures={sequencer.currentPattern.measures}
                getMusicalPosition={sequencer.getMusicalPosition}
                instruments={sequencer.instruments}
              />
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            color: theme.colors.text.secondary,
            marginTop: theme.spacing.xl,
            padding: theme.spacing.xl,
          }}>
            <p style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing.md }}>
              No playback method configured
            </p>
            <p style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.lg,
            }}>
              To begin, choose one of the following:
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'left',
            }}>
              <div style={{
                padding: theme.spacing.md,
                background: theme.colors.bg.secondary,
                borderRadius: theme.borderRadius.sm,
              }}>
                <strong>Option 1: Connect a MIDI device</strong>
                <p style={{ fontSize: theme.typography.fontSize.sm, margin: `${theme.spacing.sm} 0 0 0` }}>
                  {isMidiAvailable
                    ? 'Connect a MIDI device and grant permission when prompted'
                    : 'Your browser doesn\'t support Web MIDI API'}
                </p>
              </div>
              <div style={{
                padding: theme.spacing.md,
                background: theme.colors.bg.secondary,
                borderRadius: theme.borderRadius.sm,
              }}>
                <strong>Option 2: Use audio samples</strong>
                <p style={{ fontSize: theme.typography.fontSize.sm, margin: `${theme.spacing.sm} 0 0 0` }}>
                  Open Settings (gear icon below) and switch instruments to Sample mode, then load audio files
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer
        currentQuestionIndex={sequencer.currentQuestionIndex}
        hasSubmitted={sequencer.hasSubmitted}
        isQuizComplete={sequencer.isQuizComplete}
        quizResults={sequencer.quizResults}
        submitAnswer={handleSubmitAnswer}
        goToNextQuestion={handleNextQuestion}
        restartQuiz={sequencer.restartQuiz}
        showHints={showHints}
        differenceCount={differences.length}
        onToggleHints={handleToggleHints}
        playbackMode={playbackMode}
        onTogglePlaybackMode={handleTogglePlaybackMode}
        isPlaying={sequencer.isPlaying}
        selectedOutput={selectedOutput}
        onTogglePlayback={handleTogglePlayback}
        viewMode={viewMode}
        onToggleSettings={handleToggleSettings}
        instruments={drumSettings.instruments}
        getAudioBuffer={drumSettings.getAudioBuffer}
      />
    </div>
  );
}
