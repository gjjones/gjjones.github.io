import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { theme, getButtonStyles } from '../../theme.js';
import { getAllLessons } from '../../utils/curriculumLoader.js';
import {
  useProgressTracking,
  getQualityProgress,
  getProgressSummary,
} from '../../hooks/useProgressTracking.jsx';
import { DashboardHeader } from './DashboardHeader.jsx';
import { StatsOverview } from './StatsOverview.jsx';
import { QualityMasteryChart } from './charts/QualityMasteryChart.jsx';
import { CompletionOverview } from './charts/CompletionOverview.jsx';
import { QualityTrendChart } from './charts/QualityTrendChart.jsx';

/**
 * Progress Dashboard Component
 *
 * Displays comprehensive progress analytics including:
 * - Overall statistics summary
 * - Quality/skill mastery visualization
 * - Lesson completion overview
 */
export function Dashboard() {
  const navigate = useNavigate();
  const { progress, isLoading } = useProgressTracking();
  const lessons = getAllLessons();

  // Compute derived data with memoization for performance
  const qualityProgress = useMemo(() => {
    if (!progress || !lessons) return [];
    return getQualityProgress(progress, lessons);
  }, [progress, lessons]);

  const summary = useMemo(() => {
    if (!progress) return null;
    return getProgressSummary(progress);
  }, [progress]);

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: theme.spacing.xl,
        }}
      >
        <p
          style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.text.secondary,
          }}
        >
          Loading progress data...
        </p>
      </div>
    );
  }

  // Empty state - no progress yet
  if (!progress || !summary || summary.lessonsCompleted === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: theme.spacing.xl,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing.md,
            color: theme.colors.text.primary,
          }}
        >
          No Progress Yet
        </h2>
        <p
          style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xl,
          }}
        >
          Complete some lessons to see your progress dashboard.
        </p>
        <button
          onClick={() => navigate({ to: '/' })}
          style={{
            ...getButtonStyles('primary'),
          }}
        >
          Go to Lessons
        </button>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div
      style={{
        padding: theme.spacing.xl,
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: '100vh',
      }}
    >
      <DashboardHeader onBack={() => navigate({ to: '/' })} />

      <StatsOverview summary={summary} qualityProgress={qualityProgress} />

      {/* Quality Trend Chart - Full width */}
      {progress.qualityHistory && Object.keys(progress.qualityHistory).length > 0 && (
        <div style={{ marginTop: theme.spacing.xl }}>
          <QualityTrendChart qualityHistory={progress.qualityHistory} />
        </div>
      )}

      {/* Chart Grid - Easy to add more charts in the future */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: theme.spacing.lg,
          marginTop: theme.spacing.xl,
        }}
      >
        <QualityMasteryChart data={qualityProgress} />

        <CompletionOverview
          completed={summary.lessonsCompleted}
          total={lessons.length}
        />
      </div>
    </div>
  );
}
