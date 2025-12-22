import { theme } from '../theme';
import { getAllQuizzes, DIFFICULTY_COLORS } from '../data/quizDefinitions';

/**
 * Main menu component for quiz selection
 * Displays available quizzes in a responsive grid layout
 */
export function MainMenu({ onSelectQuiz }) {
  const quizzes = getAllQuizzes();

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
          fontSize: '3rem',
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
          margin: 0,
        }}
      >
        Drum Practice Quiz
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.xl,
          marginTop: theme.spacing.sm,
        }}
      >
        Select a quiz to practice your rhythm skills
      </p>

      {/* Quiz grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: theme.spacing.lg,
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onSelect={() => onSelectQuiz(quiz.id)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Individual quiz card component
 * Shows quiz metadata with interactive hover effects
 */
function QuizCard({ quiz, onSelect }) {
  const difficultyColor = DIFFICULTY_COLORS[quiz.difficulty];

  return (
    <button
      onClick={onSelect}
      style={{
        padding: theme.spacing.lg,
        background: theme.colors.bg.secondary,
        border: `2px solid ${theme.colors.border.default}`,
        borderRadius: theme.borderRadius.md,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.colors.primary;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.colors.border.default;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Difficulty badge */}
      <div
        style={{
          display: 'inline-block',
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          background: difficultyColor,
          color: 'white',
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: theme.spacing.sm,
        }}
      >
        {quiz.difficulty}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xs,
          marginTop: 0,
        }}
      >
        {quiz.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          marginTop: 0,
        }}
      >
        {quiz.description}
      </p>

      {/* Question count */}
      <div
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        {quiz.totalQuestions} {quiz.totalQuestions === 1 ? 'question' : 'questions'}
      </div>
    </button>
  );
}
