import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useMidiContext } from '../contexts/MidiContext';
import { getQuizById } from '../data/quizDefinitions';
import { useSequencer } from '../hooks/useSequencer';
import { PermissionRequest } from '../components/ErrorStates/PermissionRequest';
import { QuizComplete } from '../components/QuizComplete';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ListenMode } from '../components/ListenMode';
import { SequencerGrid } from '../components/SequencerGrid';
import { getDifferences } from '../utils/sequenceComparison';
import { theme } from '../theme';

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
    selectedQuiz || getQuizById('basicGrooves')
  );

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      sequencer.stop();
    };
  }, [sequencer]);

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
    setPlaybackMode((prev) => prev === 'user' ? 'hidden' : 'user');
    // Restart playback if currently playing to hear the switched sequence
    if (sequencer.isPlaying) {
      sequencer.restart();
    }
  };

  const handleSubmitAnswer = () => {
    sequencer.submitAnswer();

    // Auto-show hints if answer is incorrect
    const differences = getDifferences(sequencer.userSequence, sequencer.currentPattern.steps);
    const isCorrect = differences.length === 0;

    if (!isCorrect) {
      setShowHints(true);
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

  // If MIDI permission not granted, show permission request
  if (permissionStatus !== 'granted') {
    return (
      <div style={{
        fontFamily: theme.typography.fontFamily.base,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <PermissionRequest onRequestAccess={requestAccess} />
      </div>
    );
  }

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
          outputs={outputs}
          selectedOutput={selectedOutput}
          onSelectOutputDevice={selectOutputDevice}
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
        outputs={outputs}
        selectedOutput={selectedOutput}
        onSelectOutputDevice={selectOutputDevice}
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
        {selectedOutput && selectedOutput.state === 'connected' ? (
          <>
            {playbackMode === 'hidden' ? (
              <ListenMode
                currentStep={sequencer.currentStep}
                totalSteps={sequencer.currentPattern.totalSteps}
                stepsPerMeasure={sequencer.currentPattern.stepsPerMeasure}
                measures={sequencer.currentPattern.measures}
                bpm={sequencer.bpm}
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
              />
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            color: theme.colors.text.secondary,
            marginTop: theme.spacing.xl
          }}>
            <p style={{ fontSize: theme.typography.fontSize.lg }}>Select a MIDI device to begin</p>
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
      />
    </div>
  );
}
