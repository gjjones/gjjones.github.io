/**
 * Progress Tracking Hook
 *
 * Manages persistent progress tracking across sessions using localStorage.
 * Tracks lesson completion, accuracy, per-pattern results, and overall statistics.
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Storage key for progress data
 */
const PROGRESS_STORAGE_KEY = 'rhythmCurriculum_progress';

/**
 * Current schema version for migration support
 */
const CURRENT_SCHEMA_VERSION = 1;

/**
 * Initial progress data structure
 */
const createInitialProgress = () => ({
  version: CURRENT_SCHEMA_VERSION,
  userId: 'local-user', // Future: support multiple users
  lessonProgress: {},
  currentPhase: 1,
  completedLessons: [],
  masteredQualities: [],
  overallStats: {
    totalPatterns: 0,
    correctPatterns: 0,
    accuracy: 0,
    totalTime: 0, // seconds spent practicing
    lastPracticed: null
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

/**
 * Hook for managing progress tracking
 */
export function useProgressTracking() {
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load progress from localStorage
   */
  const loadProgress = useCallback(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);

        // Migrate if needed
        const migrated = migrateProgress(data);
        setProgress(migrated);
      } else {
        // No existing progress, create new
        const initial = createInitialProgress();
        setProgress(initial);
        saveProgress(initial);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to load progress:', err);
      setError('Failed to load progress data');
      // Fallback to initial progress
      setProgress(createInitialProgress());
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Save progress to localStorage
   */
  const saveProgress = useCallback((progressData) => {
    try {
      const updated = {
        ...progressData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
      setProgress(updated);
      setError(null);
      return true;
    } catch (err) {
      console.error('Failed to save progress:', err);
      setError('Failed to save progress data');
      return false;
    }
  }, []);

  /**
   * Load progress on mount
   */
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  /**
   * Record lesson completion
   */
  const recordLessonCompletion = useCallback((lessonId, results) => {
    if (!progress) return false;

    const {
      accuracy,
      patternResults,
      timeTaken,
      tempo
    } = results;

    const existingProgress = progress.lessonProgress[lessonId] || {};
    const attempts = (existingProgress.attempts || 0) + 1;
    const completed = accuracy >= 0.7; // 70% threshold for completion

    const lessonData = {
      attempted: true,
      completed,
      accuracy,
      attempts,
      lastAttempted: new Date().toISOString(),
      patternResults: patternResults || [],
      averageTime: timeTaken || existingProgress.averageTime || 0,
      tempo,
      bestAccuracy: Math.max(accuracy, existingProgress.bestAccuracy || 0)
    };

    // Update completed lessons list
    const completedLessons = new Set(progress.completedLessons);
    if (completed && !completedLessons.has(lessonId)) {
      completedLessons.add(lessonId);
    }

    // Update overall stats
    const totalPatterns = progress.overallStats.totalPatterns + (patternResults?.length || 0);
    const correctPatterns = progress.overallStats.correctPatterns +
      (patternResults?.filter(r => r === true).length || 0);

    const updatedProgress = {
      ...progress,
      lessonProgress: {
        ...progress.lessonProgress,
        [lessonId]: lessonData
      },
      completedLessons: Array.from(completedLessons),
      overallStats: {
        ...progress.overallStats,
        totalPatterns,
        correctPatterns,
        accuracy: totalPatterns > 0 ? correctPatterns / totalPatterns : 0,
        totalTime: progress.overallStats.totalTime + (timeTaken || 0),
        lastPracticed: new Date().toISOString()
      }
    };

    return saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  /**
   * Record individual pattern result
   */
  const recordPatternResult = useCallback((lessonId, patternIndex, isCorrect, timeTaken) => {
    if (!progress) return false;

    const existingProgress = progress.lessonProgress[lessonId] || {
      attempted: true,
      completed: false,
      accuracy: 0,
      attempts: 1,
      patternResults: [],
      lastAttempted: new Date().toISOString()
    };

    // Update pattern results
    const patternResults = [...(existingProgress.patternResults || [])];
    patternResults[patternIndex] = isCorrect;

    // Recalculate accuracy
    const completedPatterns = patternResults.filter(r => r !== undefined).length;
    const correctPatterns = patternResults.filter(r => r === true).length;
    const accuracy = completedPatterns > 0 ? correctPatterns / completedPatterns : 0;

    const updatedProgress = {
      ...progress,
      lessonProgress: {
        ...progress.lessonProgress,
        [lessonId]: {
          ...existingProgress,
          patternResults,
          accuracy,
          lastAttempted: new Date().toISOString()
        }
      }
    };

    return saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  /**
   * Mark a quality as mastered
   */
  const markQualityMastered = useCallback((quality) => {
    if (!progress) return false;

    const masteredQualities = new Set(progress.masteredQualities);
    masteredQualities.add(quality);

    const updatedProgress = {
      ...progress,
      masteredQualities: Array.from(masteredQualities)
    };

    return saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  /**
   * Update current phase
   */
  const updateCurrentPhase = useCallback((phaseNumber) => {
    if (!progress) return false;

    const updatedProgress = {
      ...progress,
      currentPhase: phaseNumber
    };

    return saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  /**
   * Reset all progress (with confirmation)
   */
  const resetProgress = useCallback(() => {
    const initial = createInitialProgress();
    return saveProgress(initial);
  }, [saveProgress]);

  /**
   * Export progress data for backup
   */
  const exportProgress = useCallback(() => {
    if (!progress) return null;

    return {
      ...progress,
      exportedAt: new Date().toISOString()
    };
  }, [progress]);

  /**
   * Import progress data from backup
   */
  const importProgress = useCallback((data) => {
    try {
      const migrated = migrateProgress(data);
      return saveProgress(migrated);
    } catch (err) {
      console.error('Failed to import progress:', err);
      setError('Failed to import progress data');
      return false;
    }
  }, [saveProgress]);

  /**
   * Get lesson progress
   */
  const getLessonProgress = useCallback((lessonId) => {
    return progress?.lessonProgress?.[lessonId] || null;
  }, [progress]);

  /**
   * Check if lesson is completed
   */
  const isLessonCompleted = useCallback((lessonId) => {
    return progress?.completedLessons?.includes(lessonId) || false;
  }, [progress]);

  /**
   * Get accuracy for a specific lesson
   */
  const getLessonAccuracy = useCallback((lessonId) => {
    return progress?.lessonProgress?.[lessonId]?.accuracy || 0;
  }, [progress]);

  /**
   * Get overall accuracy
   */
  const getOverallAccuracy = useCallback(() => {
    return progress?.overallStats?.accuracy || 0;
  }, [progress]);

  return {
    progress,
    isLoading,
    error,

    // Actions
    recordLessonCompletion,
    recordPatternResult,
    markQualityMastered,
    updateCurrentPhase,
    resetProgress,
    exportProgress,
    importProgress,

    // Queries
    getLessonProgress,
    isLessonCompleted,
    getLessonAccuracy,
    getOverallAccuracy
  };
}

/**
 * Migrate progress data to current schema version
 */
function migrateProgress(data) {
  // If already current version, return as-is
  if (data.version === CURRENT_SCHEMA_VERSION) {
    return data;
  }

  // No previous versions yet, but this is where migrations would go
  // Example migration:
  // if (data.version === 0 || !data.version) {
  //   // Migrate from v0 to v1
  //   data = migrateV0ToV1(data);
  // }

  // Update version
  data.version = CURRENT_SCHEMA_VERSION;

  return data;
}

/**
 * Get progress summary statistics
 */
export function getProgressSummary(progress) {
  if (!progress) {
    return {
      lessonsCompleted: 0,
      totalLessons: 0,
      overallAccuracy: 0,
      currentPhase: 1,
      qualitiesMastered: 0
    };
  }

  return {
    lessonsCompleted: progress.completedLessons?.length || 0,
    totalLessons: Object.keys(progress.lessonProgress || {}).length,
    overallAccuracy: progress.overallStats?.accuracy || 0,
    currentPhase: progress.currentPhase || 1,
    qualitiesMastered: progress.masteredQualities?.length || 0,
    totalTime: progress.overallStats?.totalTime || 0,
    lastPracticed: progress.overallStats?.lastPracticed
  };
}

/**
 * Calculate completion percentage
 */
export function getCompletionPercentage(progress, totalLessons = 17) {
  if (!progress) return 0;

  const completed = progress.completedLessons?.length || 0;
  return (completed / totalLessons) * 100;
}

/**
 * Check if user needs review based on accuracy
 */
export function needsReview(progress, threshold = 0.7) {
  if (!progress) return false;

  return progress.overallStats?.accuracy < threshold;
}

/**
 * Get weak qualities (qualities with low accuracy)
 */
export function getWeakQualities(progress, lessons, threshold = 0.7) {
  if (!progress || !lessons) return [];

  const qualityAccuracy = {};

  // Calculate accuracy per quality
  lessons.forEach(lesson => {
    const lessonProgress = progress.lessonProgress[lesson.id];
    if (lessonProgress && lessonProgress.accuracy !== undefined) {
      if (!qualityAccuracy[lesson.quality]) {
        qualityAccuracy[lesson.quality] = {
          total: 0,
          sum: 0
        };
      }
      qualityAccuracy[lesson.quality].total++;
      qualityAccuracy[lesson.quality].sum += lessonProgress.accuracy;
    }
  });

  // Find qualities below threshold
  return Object.entries(qualityAccuracy)
    .map(([quality, data]) => ({
      quality,
      accuracy: data.sum / data.total
    }))
    .filter(q => q.accuracy < threshold)
    .sort((a, b) => a.accuracy - b.accuracy); // Worst first
}

/**
 * Categorize accuracy into mastery levels
 * @param {number} accuracy - 0-1 accuracy percentage
 * @returns {Object} Mastery level with label and color
 */
function getMasteryLevel(accuracy) {
  if (accuracy >= 0.9) {
    return { level: 'mastered', label: 'Mastered', color: 'green' };
  } else if (accuracy >= 0.7) {
    return { level: 'developing', label: 'Developing', color: 'yellow' };
  } else {
    return { level: 'needs-practice', label: 'Needs Practice', color: 'red' };
  }
}

/**
 * Get review interval in days based on mastery level
 * @param {string} masteryLevel - Mastery level ('mastered', 'developing', 'needs-practice')
 * @returns {number} Days until review recommended
 */
function getReviewIntervalDays(masteryLevel) {
  switch (masteryLevel) {
    case 'mastered':
      return 21; // 3 weeks for mastered skills
    case 'developing':
      return 10; // 10 days for developing skills
    case 'needs-practice':
      return 5; // 5 days for skills needing practice
    default:
      return 7; // Default 1 week
  }
}

/**
 * Calculate days since last practice
 * @param {string} lastPracticedISO - ISO timestamp of last practice
 * @returns {number} Days since last practice
 */
function getDaysSinceLastPractice(lastPracticedISO) {
  if (!lastPracticedISO) return Infinity;

  const lastPracticed = new Date(lastPracticedISO);
  const now = new Date();
  const diffMs = now - lastPracticed;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Format days into relative time string
 * @param {number} days - Number of days
 * @returns {string} Formatted string (e.g., "2 weeks ago", "3 days ago")
 */
function formatDaysAgo(days) {
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return '1 week ago';
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  return `${months} months ago`;
}

/**
 * Determine if a quality is overdue for review
 * @param {string} lastPracticedISO - ISO timestamp of last practice
 * @param {string} masteryLevel - Mastery level
 * @returns {boolean} True if overdue for review
 */
function isOverdueForReview(lastPracticedISO, masteryLevel) {
  const daysSince = getDaysSinceLastPractice(lastPracticedISO);
  const intervalDays = getReviewIntervalDays(masteryLevel);

  return daysSince >= intervalDays;
}

/**
 * Get progress for all qualities (not just weak ones)
 * @param {Object} progress - Progress data
 * @param {Array} lessons - All lesson objects
 * @returns {Array} Quality progress with mastery levels
 */
export function getQualityProgress(progress, lessons) {
  if (!progress || !lessons) return [];

  const qualityAccuracy = {};

  // Calculate accuracy per quality (same logic as getWeakQualities)
  lessons.forEach(lesson => {
    const quality = lesson.quality || lesson.metadata?.quality;
    if (!quality) return;

    const lessonProgress = progress.lessonProgress[lesson.id];
    if (lessonProgress && lessonProgress.accuracy !== undefined) {
      if (!qualityAccuracy[quality]) {
        qualityAccuracy[quality] = {
          total: 0,
          sum: 0,
          lastPracticed: null
        };
      }
      qualityAccuracy[quality].total++;
      qualityAccuracy[quality].sum += lessonProgress.accuracy;

      // Track most recent practice time
      if (!qualityAccuracy[quality].lastPracticed ||
          lessonProgress.lastAttempted > qualityAccuracy[quality].lastPracticed) {
        qualityAccuracy[quality].lastPracticed = lessonProgress.lastAttempted;
      }
    }
  });

  // Return all qualities with mastery levels and review schedule
  return Object.entries(qualityAccuracy)
    .map(([quality, data]) => {
      const accuracy = data.sum / data.total;
      const masteryLevel = getMasteryLevel(accuracy);
      const daysSince = getDaysSinceLastPractice(data.lastPracticed);
      const isOverdue = isOverdueForReview(data.lastPracticed, masteryLevel.level);

      return {
        quality,
        accuracy: Math.round(accuracy * 100), // Convert to percentage
        masteryLevel,
        lessonCount: data.total,
        lastPracticed: data.lastPracticed,
        needsReview: accuracy < 0.7,
        // Spaced repetition fields
        daysSinceLastPractice: daysSince,
        lastPracticedFormatted: data.lastPracticed ? formatDaysAgo(daysSince) : 'never',
        isOverdue,
        reviewIntervalDays: getReviewIntervalDays(masteryLevel.level)
      };
    })
    .sort((a, b) => b.accuracy - a.accuracy); // Best first
}

export default useProgressTracking;
