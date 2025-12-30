import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { theme, getButtonStyles } from '../theme';
import { getAllLessons, getLessonsByPhase } from '../utils/curriculumLoader';
import { useProgressTracking, getQualityProgress, getWeakQualities } from '../hooks/useProgressTracking';
import { useWarmupMode } from '../hooks/useWarmupMode';
import { getRecommendedLesson, STRATEGY } from '../utils/recommendationEngine';
import { DifficultySelector } from './DifficultySelector';

/**
 * Lesson menu component for curriculum navigation
 * Displays available lessons grouped by phase with progress indicators
 */
export function LessonMenu({ onSelectLesson }) {
  const navigate = useNavigate();
  const lessons = getAllLessons();
  const { progress: progressData } = useProgressTracking();
  const { isWarmupMode, toggleWarmupMode, warmupReduction } = useWarmupMode();

  // Handle lesson selection with difficulty parameter
  const handleLessonSelect = (lessonId, difficulty = 'all') => {
    navigate({
      to: '/quiz/$quizId',
      params: { quizId: lessonId },
      search: difficulty !== 'all' ? { difficulty } : {}
    });
  };

  // Group lessons by phase
  const phase1Lessons = getLessonsByPhase(1);
  const phase2Lessons = getLessonsByPhase(2);
  const phase3Lessons = getLessonsByPhase(3);

  // Get quality progress for all 9 qualities
  const qualityProgress = useMemo(() => {
    return getQualityProgress(progressData, lessons);
  }, [progressData, lessons]);

  // Get recommended lesson based on weak qualities
  const recommendationResult = useMemo(() => {
    if (!progressData) return null;
    return getRecommendedLesson(progressData, STRATEGY.QUALITY_TARGETED);
  }, [progressData]);

  // Get weak qualities for display
  const weakQualities = useMemo(() => {
    return getWeakQualities(progressData, lessons);
  }, [progressData, lessons]);

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
          marginBottom: theme.spacing.lg,
          marginTop: theme.spacing.sm,
        }}
      >
        Master drum transcription through structured lessons
      </p>

      {/* Dashboard Button */}
      <button
        onClick={() => navigate({ to: '/dashboard' })}
        style={{
          ...getButtonStyles('primary'),
          marginBottom: theme.spacing.lg,
        }}
      >
        View Progress Dashboard
      </button>

      {/* Warmup Mode Toggle */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        marginBottom: theme.spacing.lg,
        padding: theme.spacing.md,
        background: isWarmupMode ? theme.colors.warning : theme.colors.bg.secondary,
        border: `2px solid ${isWarmupMode ? theme.colors.warning : theme.colors.border.default}`,
        borderRadius: theme.borderRadius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        transition: `all ${theme.transitions.base}`,
      }}>
        <div>
          <div style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}>
            Warmup Mode {isWarmupMode ? 'ON' : 'OFF'}
          </div>
          <p style={{
            margin: 0,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary
          }}>
            {isWarmupMode
              ? `All patterns play ${warmupReduction} BPM slower for easier practice`
              : 'Practice at normal lesson tempos'}
          </p>
        </div>

        <button
          onClick={toggleWarmupMode}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            background: isWarmupMode ? theme.colors.success : theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.sm,
            cursor: 'pointer',
            transition: `all ${theme.transitions.base}`,
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
          }}
        >
          {isWarmupMode ? 'Disable' : 'Enable'} Warmup
        </button>
      </div>

      {/* Quality Progress Summary */}
      {qualityProgress.length > 0 && (
        <div style={{
          width: '100%',
          maxWidth: '900px',
          marginBottom: theme.spacing.xl,
          padding: theme.spacing.lg,
          background: theme.colors.bg.secondary,
          border: `2px solid ${theme.colors.border.default}`,
          borderRadius: theme.borderRadius.md,
        }}>
          <h2 style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}>
            Your Skill Progress
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: theme.spacing.md,
          }}>
            {qualityProgress.map(({
              quality,
              accuracy,
              masteryLevel,
              needsReview,
              isOverdue,
              lastPracticedFormatted,
              daysSinceLastPractice
            }) => (
              <div
                key={quality}
                style={{
                  padding: theme.spacing.md,
                  background: theme.colors.bg.primary,
                  border: `2px solid ${isOverdue ? theme.colors.warning : getMasteryColor(masteryLevel.level)}`,
                  borderRadius: theme.borderRadius.sm,
                  position: 'relative',
                }}
              >
                {/* Overdue indicator */}
                {isOverdue && (
                  <div style={{
                    position: 'absolute',
                    top: theme.spacing.xs,
                    right: theme.spacing.xs,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.warning,
                  }}>
                    ⚠️ Overdue
                  </div>
                )}

                <div style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs,
                }}>
                  {formatQualityName(quality)}
                </div>
                <div style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: getMasteryColor(masteryLevel.level),
                }}>
                  {accuracy}%
                </div>
                <div style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.xs,
                }}>
                  {masteryLevel.label}
                  {needsReview && ' • Review Recommended'}
                </div>

                {/* Last practiced info */}
                {daysSinceLastPractice !== Infinity && (
                  <div style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: isOverdue ? theme.colors.warning : theme.colors.text.secondary,
                    fontStyle: 'italic',
                    marginTop: theme.spacing.xs,
                  }}>
                    {isOverdue ? '🔄 ' : '📅 '}
                    Last practiced {lastPracticedFormatted}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation Banner */}
      {recommendationResult?.lessonId && (
        <div style={{
          width: '100%',
          maxWidth: '900px',
          marginBottom: theme.spacing.lg,
          padding: theme.spacing.md,
          background: theme.colors.primary + '20',
          border: `2px solid ${theme.colors.primary}`,
          borderRadius: theme.borderRadius.md,
        }}>
          <div style={{
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}>
            ⭐ Recommended Next
          </div>
          <div style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
          }}>
            {recommendationResult.reason}
            {weakQualities.length > 0 && (
              <span> • Focus on: {formatQualityName(weakQualities[0].quality)}</span>
            )}
          </div>
        </div>
      )}

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
                onSelect={handleLessonSelect}
                isRecommended={recommendationResult?.lessonId === lesson.id}
                qualityProgress={qualityProgress}
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
                onSelect={handleLessonSelect}
                isRecommended={recommendationResult?.lessonId === lesson.id}
                qualityProgress={qualityProgress}
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
                onSelect={handleLessonSelect}
                isRecommended={recommendationResult?.lessonId === lesson.id}
                qualityProgress={qualityProgress}
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
 * Shows lesson metadata with skill mastery indicator
 */
function LessonCard({ lesson, progressData, onSelect, isRecommended, qualityProgress }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Get progress for this lesson
  const lessonProgress = progressData?.lessonProgress?.[lesson.id];

  // Get quality mastery for this lesson
  const quality = lesson.quality || lesson.metadata?.quality;
  const qualityData = qualityProgress?.find(q => q.quality === quality);

  const handleCardClick = () => {
    onSelect(lesson.id, selectedDifficulty);
  };

  return (
    <button
      onClick={handleCardClick}
      style={{
        padding: theme.spacing.lg,
        background: theme.colors.bg.secondary,
        border: `2px solid ${isRecommended ? theme.colors.primary : theme.colors.border.default}`,
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
        e.currentTarget.style.borderColor = isRecommended
          ? theme.colors.primary
          : theme.colors.border.default;
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

      {/* Recommended badge */}
      {isRecommended && (
        <div
          style={{
            position: 'absolute',
            top: theme.spacing.md,
            right: theme.spacing.md,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: theme.colors.primary,
            color: 'white',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          ⭐ Recommended
        </div>
      )}

      {/* Quality mastery indicator (replaces completion badge) */}
      {qualityData && (
        <div
          style={{
            position: 'absolute',
            top: theme.spacing.md,
            right: isRecommended ? '120px' : theme.spacing.md,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: getMasteryColor(qualityData.masteryLevel.level),
            color: 'white',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {qualityData.accuracy}%
          {qualityData.needsReview && ' • Review'}
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
          paddingRight: '100px',
        }}
      >
        {lesson.title}
      </h3>

      {/* Quality name */}
      {quality && (
        <div
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.sm,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          Skill: {formatQualityName(quality)}
        </div>
      )}

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
          marginBottom: theme.spacing.sm,
        }}
      >
        {lesson.patterns?.length || 10} patterns
      </div>

      {/* Difficulty selector */}
      <DifficultySelector
        onSelect={setSelectedDifficulty}
        defaultDifficulty="all"
      />
    </button>
  );
}

/**
 * Format quality slug into readable name
 */
function formatQualityName(quality) {
  if (!quality) return '';

  const nameMap = {
    'downbeat-identification': 'Downbeat Identification',
    'upbeat-identification': 'Upbeat Identification',
    '16th-note-subdivision': '16th Note Subdivision',
    'open-hihat-choking': 'Hi-Hat Choking',
    '16th-note-ghost-notes': 'Ghost Notes',
    'backbeat-displacement': 'Backbeat Displacement',
    'rhythmic-anchoring': 'Rhythmic Anchoring',
    'two-bar-memory': 'Two-Bar Memory',
    'tom-fills': 'Tom Fills',
  };

  return nameMap[quality] || quality
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get color for mastery level
 */
function getMasteryColor(level) {
  const colors = {
    'mastered': theme.colors.success,
    'developing': theme.colors.warning,
    'needs-practice': theme.colors.error,
  };
  return colors[level] || theme.colors.text.secondary;
}
