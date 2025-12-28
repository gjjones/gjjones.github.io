import { theme, getButtonStyles } from '../../theme.js';

/**
 * Dashboard Header Component
 *
 * Displays the dashboard title and back navigation button
 * @param {Function} onBack - Callback when back button is clicked
 */
export function DashboardHeader({ onBack }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.md,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            margin: 0,
            marginBottom: theme.spacing.xs,
          }}
        >
          Progress Dashboard
        </h1>
        <p
          style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.secondary,
            margin: 0,
          }}
        >
          Track your skill development and learning progress
        </p>
      </div>

      <button onClick={onBack} style={{ ...getButtonStyles('secondary') }}>
        ← Back to Lessons
      </button>
    </div>
  );
}
