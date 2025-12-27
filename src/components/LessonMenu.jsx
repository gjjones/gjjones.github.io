import { theme } from '../theme';
import { getAllLessons, getLessonsByPhase } from '../utils/curriculumLoader';
import { useProgressTracking } from '../hooks/useProgressTracking';

/**
 * Lesson menu component for curriculum navigation
 * Displays available lessons grouped by phase with progress indicators
 */
export function LessonMenu({ onSelectLesson }) {
  const lessons = getAllLessons();
  const { progress: progressData } = useProgressTracking();

  // Group lessons by phase
  const phase1Lessons = getLessonsByPhase(1);
  const phase2Lessons = getLessonsByPhase(2);
  const phase3Lessons = getLessonsByPhase(3);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.xl,
        textAlign: 'center',
        flex: 1,
        overflowY: 'auto',
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
        Rhythm Curriculum
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
        Master drum transcription through structured lessons
      </p>

      {/* Phase 1: Core Lessons */}
      {phase1Lessons.length > 0 && (
        <div style={{ width: '100%', maxWidth: '900px', marginBottom: theme.spacing.xl }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
              textAlign: 'left',
            }}
          >
            Phase 1: Core Lessons
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            {phase1Lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progressData={progressData}
                onSelect={() => onSelectLesson(lesson.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Phase 2: Review Lessons (if any exist) */}
      {phase2Lessons.length > 0 && (
        <div style={{ width: '100%', maxWidth: '900px', marginBottom: theme.spacing.xl }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
              textAlign: 'left',
            }}
          >
            Phase 2: Review Lessons
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            {phase2Lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progressData={progressData}
                onSelect={() => onSelectLesson(lesson.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Phase 3: Expansion Lessons (if any exist) */}
      {phase3Lessons.length > 0 && (
        <div style={{ width: '100%', maxWidth: '900px', marginBottom: theme.spacing.xl }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
              textAlign: 'left',
            }}
          >
            Phase 3: Expansion Lessons
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            {phase3Lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progressData={progressData}
                onSelect={() => onSelectLesson(lesson.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Individual lesson card component
 * Shows lesson metadata with progress indicator
 */
function LessonCard({ lesson, progressData, onSelect }) {
  // Get progress for this lesson
  const lessonProgress = progressData?.lessonProgress?.[lesson.id];
  const isCompleted = lessonProgress?.completed || false;
  const isInProgress = lessonProgress?.attempted && !isCompleted;
  const accuracy = lessonProgress?.accuracy || 0;

  // Determine status badge
  let statusBadge = null;
  if (isCompleted) {
    statusBadge = {
      text: `✓ ${Math.round(accuracy * 100)}%`,
      color: theme.colors.success,
    };
  } else if (isInProgress) {
    statusBadge = {
      text: 'In Progress',
      color: theme.colors.warning,
    };
  }

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
        transition: `all ${theme.transitions.base}`,
        position: 'relative',
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
      {/* Lesson number badge */}
      <div
        style={{
          display: 'inline-block',
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          background: theme.colors.primary,
          color: 'white',
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium,
          marginBottom: theme.spacing.sm,
        }}
      >
        Lesson {lesson.lessonNumber}
      </div>

      {/* Status badge (if applicable) */}
      {statusBadge && (
        <div
          style={{
            position: 'absolute',
            top: theme.spacing.md,
            right: theme.spacing.md,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: statusBadge.color,
            color: 'white',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {statusBadge.text}
        </div>
      )}

      {/* Title */}
      <h3
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xs,
          marginTop: 0,
          paddingRight: statusBadge ? '80px' : 0,
        }}
      >
        {lesson.title}
      </h3>

      {/* Concept */}
      <p
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          marginTop: 0,
          fontStyle: 'italic',
        }}
      >
        {lesson.concept}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          marginTop: 0,
        }}
      >
        {lesson.description}
      </p>

      {/* Pattern count */}
      <div
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        {lesson.patterns?.length || 10} patterns
      </div>
    </button>
  );
}
