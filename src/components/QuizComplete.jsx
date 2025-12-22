import { theme } from '../theme';

export function QuizComplete({ quizResults, onRestart, onReturnToMenu }) {
  // Calculate score
  const correctCount = quizResults.filter((result) => result === true).length;
  const totalQuestions = quizResults.length;
  const percentage = (correctCount / totalQuestions) * 100;

  // Determine grade
  const getGrade = (pct) => {
    if (pct === 100) return 'A+';
    if (pct >= 90) return 'A';
    if (pct >= 80) return 'B';
    if (pct >= 70) return 'C';
    if (pct >= 60) return 'D';
    return 'F';
  };

  const grade = getGrade(percentage);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
        textAlign: 'center',
        flex: 1,
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}
      >
        Quiz Complete!
      </h1>

      {/* Grade */}
      <div
        style={{
          fontSize: '80px',
          fontWeight: theme.typography.fontWeight.bold,
          color: percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444',
          marginBottom: theme.spacing.md,
        }}
      >
        {grade}
      </div>

      {/* Score */}
      <div
        style={{
          fontSize: theme.typography.fontSize.xl,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xl,
        }}
      >
        {correctCount} out of {totalQuestions} correct ({Math.round(percentage)}%)
      </div>

      {/* Results Summary */}
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        {quizResults.map((result, index) => (
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: result ? '#22c55e' : '#ef4444',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.medium,
            }}
            title={`Question ${index + 1}: ${result ? 'Correct' : 'Incorrect'}`}
          >
            {result ? '✓' : '✗'}
          </div>
        ))}
      </div>

      {/* Feedback message */}
      <div
        style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.xl,
          maxWidth: '400px',
        }}
      >
        {percentage === 100 && 'Perfect score! You nailed every rhythm!'}
        {percentage >= 80 && percentage < 100 && 'Great job! You have a strong sense of rhythm!'}
        {percentage >= 60 && percentage < 80 && 'Good work! Keep practicing those patterns.'}
        {percentage >= 40 && percentage < 60 && 'Not bad! More practice will help you improve.'}
        {percentage < 40 && 'Keep practicing! Every drummer starts somewhere.'}
      </div>

      {/* Button group */}
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.md,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={onRestart}
          style={{
            padding: `${theme.spacing.md} ${theme.spacing.xl}`,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.medium,
            background: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.base,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          Retry Quiz
        </button>

        <button
          onClick={onReturnToMenu}
          style={{
            padding: `${theme.spacing.md} ${theme.spacing.xl}`,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.medium,
            background: theme.colors.bg.secondary,
            color: theme.colors.text.primary,
            border: `2px solid ${theme.colors.border.default}`,
            borderRadius: theme.borderRadius.base,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = theme.colors.primary;
            e.target.style.background = theme.colors.bg.primary;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.colors.border.default;
            e.target.style.background = theme.colors.bg.secondary;
          }}
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
}
