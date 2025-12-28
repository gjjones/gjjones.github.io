import { theme } from '../../../theme.js';
import { chartColors } from './chartConfig.js';

/**
 * Completion Overview Component
 *
 * Displays lesson completion progress with a visual progress bar
 * @param {number} completed - Number of completed lessons
 * @param {number} total - Total number of lessons
 */
export function CompletionOverview({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  return (
    <div
      style={{
        padding: theme.spacing.lg,
        background: theme.colors.bg.secondary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border.default}`,
      }}
    >
      <h3
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          marginBottom: theme.spacing.md,
          color: theme.colors.text.primary,
        }}
      >
        Lesson Completion
      </h3>

      {/* Progress Statistics */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: theme.spacing.lg,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: chartColors.completed,
            }}
          >
            {completed}
          </div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
            }}
          >
            Completed
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.secondary,
            }}
          >
            {remaining}
          </div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
            }}
          >
            Remaining
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary,
            }}
          >
            {percentage}%
          </div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
            }}
          >
            Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '40px',
          background: chartColors.incomplete,
          borderRadius: theme.borderRadius.md,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: chartColors.completed,
            transition: `width ${theme.transitions.slow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {percentage > 10 && (
            <span
              style={{
                color: theme.colors.text.white,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.base,
              }}
            >
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Total Lessons */}
      <div
        style={{
          marginTop: theme.spacing.md,
          textAlign: 'center',
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        {completed} of {total} lessons completed
      </div>
    </div>
  );
}
