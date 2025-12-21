import { theme } from '../../theme';
import { QuizControls } from './QuizControls';
import { PlaybackControls } from './PlaybackControls';
import { PlaybackModeToggle } from './PlaybackModeToggle';

export function Footer({
  currentQuestionIndex,
  hasSubmitted,
  isQuizComplete,
  quizResults,
  submitAnswer,
  goToNextQuestion,
  restartQuiz,
  showHints,
  differenceCount,
  onToggleHints,
  playbackMode,
  onTogglePlaybackMode,
  isPlaying,
  selectedOutput,
  onTogglePlayback,
}) {
  // Get the current question's result
  const isCorrect = quizResults[currentQuestionIndex];

  return (
    <footer
      style={{
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
        background: theme.colors.bg.secondary,
        borderTop: `1px solid ${theme.colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing.lg,
      }}
    >
      {/* Left: Playback mode toggle */}
      <PlaybackModeToggle
        playbackMode={playbackMode}
        onToggle={onTogglePlaybackMode}
        hasSubmitted={hasSubmitted}
      />

      {/* Center: Playback controls */}
      <PlaybackControls
        isPlaying={isPlaying}
        selectedOutput={selectedOutput}
        onTogglePlayback={onTogglePlayback}
      />

      {/* Right: Quiz controls (Hint + Submit) */}
      <QuizControls
        currentQuestionIndex={currentQuestionIndex}
        hasSubmitted={hasSubmitted}
        isCorrect={isCorrect}
        showHints={showHints}
        differenceCount={differenceCount}
        playbackMode={playbackMode}
        onSubmit={submitAnswer}
        onNext={goToNextQuestion}
        onToggleHints={onToggleHints}
        onTogglePlaybackMode={onTogglePlaybackMode}
      />
    </footer>
  );
}
