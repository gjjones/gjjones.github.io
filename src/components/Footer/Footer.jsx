import { theme } from '../../theme';
import { QuizControls } from './QuizControls';
import { PlaybackControls } from './PlaybackControls';
import { PlaybackModeToggle } from './PlaybackModeToggle';
import { SettingsButton } from './SettingsButton';

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
  viewMode,
  onToggleSettings,
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
      {/* Left: Settings button and Playback mode toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <SettingsButton
          onClick={onToggleSettings}
          isActive={viewMode === 'settings'}
          disabled={isQuizComplete}
        />
        <PlaybackModeToggle
          playbackMode={playbackMode}
          onToggle={onTogglePlaybackMode}
          hasSubmitted={hasSubmitted}
        />
      </div>

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
