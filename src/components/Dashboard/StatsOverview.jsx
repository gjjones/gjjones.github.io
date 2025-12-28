import { theme } from '../../theme.js';

/**
 * Stats Overview Component
 *
 * Displays high-level progress metrics in a card grid
 * @param {Object} summary - Progress summary from getProgressSummary()
 * @param {Array} qualityProgress - Quality progress data from getQualityProgress()
 */
export function StatsOverview({ summary, qualityProgress }) {
  // Format time in seconds to readable format
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Get color based on accuracy level
  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 0.9) return theme.colors.success;
    if (accuracy >= 0.7) return theme.colors.warning;
    return theme.colors.danger;
  };

  // Count skills mastered (90%+)
  const skillsMastered = qualityProgress.filter(
    (q) => q.masteryLevel.level === 'mastered'
  ).length;

  const stats = [
    {
      label: 'Lessons Completed',
      value: summary.lessonsCompleted,
      color: theme.colors.primary,
    },
    {
      label: 'Overall Accuracy',
      value: `${Math.round(summary.overallAccuracy * 100)}%`,
      color: getAccuracyColor(summary.overallAccuracy),
    },
    {
      label: 'Practice Time',
      value: formatTime(summary.totalTime),
      color: theme.colors.primary,
    },
    {
      label: 'Current Phase',
      value: summary.currentPhase,
      color: theme.colors.primary,
    },
    {
      label: 'Skills Mastered',
      value: skillsMastered,
      color: theme.colors.success,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: theme.spacing.md,
        marginTop: theme.spacing.lg,
      }}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

/**
 * Individual Stat Card Component
 */
function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        padding: theme.spacing.lg,
        background: theme.colors.bg.secondary,
        border: `2px solid ${color}`,
        borderRadius: theme.borderRadius.md,
        textAlign: 'center',
        transition: `all ${theme.transitions.base}`,
      }}
    >
      <div
        style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: color,
          marginBottom: theme.spacing.xs,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        {label}
      </div>
    </div>
  );
}
