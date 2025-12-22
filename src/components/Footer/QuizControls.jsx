import { theme } from '../../theme';

export function QuizControls({
  currentQuestionIndex,
  hasSubmitted,
  isCorrect,
  showHints,
  differenceCount,
  playbackMode,
  onSubmit,
  onNext,
  onToggleHints,
  onTogglePlaybackMode,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
      }}
    >
      {/* Hint button - show before submit OR after submit if incorrect */}
      {(!hasSubmitted || (hasSubmitted && isCorrect === false)) && onToggleHints && (
        <button
          onClick={onToggleHints}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            background: showHints ? '#f59e0b' : theme.colors.bg.tertiary,
            color: showHints ? 'white' : theme.colors.text.primary,
            border: `1px solid ${theme.colors.border.default}`,
            borderRadius: theme.borderRadius.base,
            cursor: 'pointer',
            transition: 'all 0.2s',
            minWidth: '100px',
          }}
          onMouseEnter={(e) => {
            if (!showHints) e.target.style.background = theme.colors.bg.secondary;
          }}
          onMouseLeave={(e) => {
            if (!showHints) e.target.style.background = theme.colors.bg.tertiary;
          }}
        >
          {showHints ? 'Hide Hints' : 'Hints'}
        </button>
      )}

      {/* Feedback message shown after submission */}
      {hasSubmitted && isCorrect !== null && (
        <div
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: isCorrect ? theme.colors.success : theme.colors.danger,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            transition: 'opacity 0.3s ease-in',
          }}
        >
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>
            {isCorrect ? '✓' : '✗'}
          </span>
          <span>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
        </div>
      )}

      {/* Submit or Next button */}
      <button
        onClick={!hasSubmitted ? onSubmit : onNext}
        style={{
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          background: theme.colors.primary,
          color: 'white',
          border: 'none',
          borderRadius: theme.borderRadius.base,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          minWidth: '140px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
        onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.target.style.opacity = '1')}
      >
        {!hasSubmitted ? 'Submit' : (currentQuestionIndex < 4 ? 'Next' : 'Finish')}
      </button>
    </div>
  );
}
