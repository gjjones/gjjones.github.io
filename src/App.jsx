import { useState, useEffect } from 'react';
import { theme } from './theme';
import { useMidi } from './hooks/useMidi';
import { useSequencer } from './hooks/useSequencer';
import { SequencerGrid } from './components/SequencerGrid';
import { ListenMode } from './components/ListenMode';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { QuizComplete } from './components/QuizComplete';
import { MainMenu } from './components/MainMenu';
import { BrowserNotSupported } from './components/ErrorStates/BrowserNotSupported';
import { PermissionRequest } from './components/ErrorStates/PermissionRequest';
import { getDifferences } from './utils/sequenceComparison';
import { getQuizById } from './data/quizDefinitions';

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

  // Navigation state
  const [appView, setAppView] = useState('menu'); // 'menu' | 'quiz' | 'quizComplete'
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  // Get selected quiz definition
  const selectedQuiz = selectedQuizId ? getQuizById(selectedQuizId) : null;

  // Playback mode: 'user' or 'hidden'
  const [playbackMode, setPlaybackMode] = useState('hidden');

  // Initialize sequencer with selected quiz (or default to basicGrooves to maintain hook rules)
  const {
    userSequence,
    currentHiddenSequence,
    currentPattern,
    currentQuestionIndex,
    quizResults,
    isQuizComplete,
    hasSubmitted,
    totalQuestions,
    submitAnswer,
    goToNextQuestion,
    restartQuiz,
    exitQuiz,
    bpm,
    setBpm,
    isPlaying,
    currentStep,
    toggleStep,
    start,
    stop,
    restart,
  } = useSequencer(sendNoteTrigger, playbackMode, selectedQuiz || getQuizById('basicGrooves'));

  // Hint system state
  const [showHints, setShowHints] = useState(false);

  const handleTogglePlayback = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  const handleToggleHints = () => {
    setShowHints((prev) => !prev);
  };

  const handleTogglePlaybackMode = () => {
    setPlaybackMode((prev) => prev === 'user' ? 'hidden' : 'user');
    // Restart playback if currently playing to hear the switched sequence
    if (isPlaying) {
      restart();
    }
  };

  const handleSubmitAnswer = () => {
    submitAnswer(); // Call original hook function

    // Auto-show hints if answer is incorrect
    const differences = getDifferences(userSequence, currentPattern.steps);
    const isCorrect = differences.length === 0;

    if (!isCorrect) {
      setShowHints(true);
    }
  };

  // Reset hints and playback mode when moving to next question
  const handleNextQuestion = () => {
    setShowHints(false);
    setPlaybackMode('hidden');
    goToNextQuestion();
    restart(); // Automatically start playing the hidden sequence from the beginning
  };

  // Navigation handlers
  const handleSelectQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setAppView('quiz');
  };

  const handleExitQuiz = () => {
    exitQuiz();
    setAppView('menu');
    setSelectedQuizId(null);
    setPlaybackMode('hidden');
    setShowHints(false);
  };

  const handleReturnToMenu = () => {
    handleExitQuiz();
  };

  const handleRestartQuiz = () => {
    restartQuiz();
    setAppView('quiz');
    setShowHints(false);
    setPlaybackMode('hidden');
  };

  // Transition to quiz complete view when quiz finishes
  useEffect(() => {
    if (isQuizComplete && appView === 'quiz') {
      setAppView('quizComplete');
    }
  }, [isQuizComplete, appView]);

  // Calculate differences for hints
  const differences = getDifferences(userSequence, currentPattern.steps);
  const highlightedCells = showHints ? differences : [];

  // Determine which sequence to display in the grid
  const displayedSequence = playbackMode === 'hidden' ? currentPattern.steps : userSequence;
  const isGridEditable = playbackMode === 'user';
  const hideNotes = playbackMode === 'hidden'; // Hide notes when viewing hidden sequence

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
      {appView !== 'menu' && (
        <Header
          outputs={outputs}
          selectedOutput={selectedOutput}
          onSelectOutputDevice={selectOutputDevice}
          bpm={bpm}
          onBpmChange={setBpm}
          currentQuestionIndex={appView === 'quiz' ? currentQuestionIndex : undefined}
          totalQuestions={selectedQuiz?.totalQuestions}
          onExit={appView === 'quiz' ? handleExitQuiz : undefined}
        />
      )}

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
        {/* View routing */}
        {appView === 'menu' && (
          <MainMenu onSelectQuiz={handleSelectQuiz} />
        )}

        {appView === 'quiz' && selectedOutput && selectedOutput.state === 'connected' && (
          <>
            {playbackMode === 'hidden' ? (
              <ListenMode
                currentStep={currentStep}
                totalSteps={currentPattern.totalSteps}
                stepsPerMeasure={currentPattern.stepsPerMeasure}
                measures={currentPattern.measures}
                bpm={bpm}
              />
            ) : (
              <SequencerGrid
                sequence={displayedSequence}
                onToggleStep={toggleStep}
                currentStep={currentStep}
                bpm={bpm}
                isEditable={isGridEditable}
                hideNotes={hideNotes}
                highlightedCells={highlightedCells}
                totalSteps={currentPattern.totalSteps}
                stepsPerMeasure={currentPattern.stepsPerMeasure}
                measures={currentPattern.measures}
              />
            )}
          </>
        )}

        {appView === 'quiz' && (!selectedOutput || selectedOutput.state !== 'connected') && (
          <div style={{ textAlign: 'center', color: theme.colors.text.secondary, marginTop: theme.spacing.xl }}>
            <p style={{ fontSize: theme.typography.fontSize.lg }}>Select a MIDI device to begin</p>
          </div>
        )}

        {appView === 'quizComplete' && (
          <QuizComplete
            quizResults={quizResults}
            onRestart={handleRestartQuiz}
            onReturnToMenu={handleReturnToMenu}
          />
        )}
      </main>

      {appView === 'quiz' && (
        <Footer
          currentQuestionIndex={currentQuestionIndex}
          hasSubmitted={hasSubmitted}
          isQuizComplete={isQuizComplete}
          quizResults={quizResults}
          submitAnswer={handleSubmitAnswer}
          goToNextQuestion={handleNextQuestion}
          restartQuiz={restartQuiz}
          showHints={showHints}
          differenceCount={differences.length}
          onToggleHints={handleToggleHints}
          playbackMode={playbackMode}
          onTogglePlaybackMode={handleTogglePlaybackMode}
          isPlaying={isPlaying}
          selectedOutput={selectedOutput}
          onTogglePlayback={handleTogglePlayback}
        />
      )}
    </div>
  );
}

export default App;
