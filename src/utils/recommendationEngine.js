/**
 * Recommendation Engine - Adaptive lesson recommendations
 *
 * Determines the next best lesson for a user based on their progress,
 * accuracy, and learning patterns. Supports sequential progression,
 * review triggers, and adaptive pathways.
 */

import { getAllLessons, arePrerequisitesMet } from './curriculumLoader.js';
import { isPhaseUnlocked, getPhaseByNumber, PHASE_2_REVIEW } from '../data/curriculumPhases.js';

/**
 * Recommendation strategy types
 */
export const STRATEGY = {
  SEQUENTIAL: 'sequential',          // Progress through lessons in order
  REVIEW_TRIGGERED: 'review',        // Recommend review when struggling
  MASTERY_SKIP: 'mastery-skip',      // Skip ahead if mastering content
  QUALITY_TARGETED: 'quality-targeted' // Focus on weak qualities
};

/**
 * Accuracy thresholds
 */
const THRESHOLDS = {
  COMPLETION: 0.7,   // 70% to mark lesson as complete
  REVIEW_TRIGGER: 0.7, // Below 70% triggers review
  MASTERY: 0.9,      // 90% indicates mastery
  WEAK_QUALITY: 0.7  // Below 70% indicates weak quality
};

/**
 * Get recommended next lesson for a user
 * @param {Object} progressData - User progress data
 * @param {string} [strategy=STRATEGY.SEQUENTIAL] - Recommendation strategy
 * @returns {{lessonId: string|null, reason: string, strategy: string}} Recommendation
 */
export function getRecommendedLesson(progressData, strategy = STRATEGY.SEQUENTIAL) {
  const allLessons = getAllLessons();

  if (!allLessons || allLessons.length === 0) {
    return {
      lessonId: null,
      reason: 'No lessons available',
      strategy: strategy
    };
  }

  // Check if user needs review
  const reviewRecommendation = checkForReviewNeed(progressData, allLessons);
  if (reviewRecommendation.lessonId) {
    return reviewRecommendation;
  }

  // Apply selected strategy
  switch (strategy) {
    case STRATEGY.SEQUENTIAL:
      return getSequentialRecommendation(progressData, allLessons);

    case STRATEGY.MASTERY_SKIP:
      return getMasteryBasedRecommendation(progressData, allLessons);

    case STRATEGY.QUALITY_TARGETED:
      return getQualityTargetedRecommendation(progressData, allLessons);

    default:
      return getSequentialRecommendation(progressData, allLessons);
  }
}

/**
 * Sequential progression through lessons
 * @param {Object} progressData - User progress data
 * @param {Object[]} allLessons - All available lessons
 * @returns {{lessonId: string|null, reason: string, strategy: string}} Recommendation
 */
function getSequentialRecommendation(progressData, allLessons) {
  // Sort lessons by phase and lesson number
  const sortedLessons = [...allLessons].sort((a, b) => {
    if (a.phase !== b.phase) {
      return a.phase - b.phase;
    }
    return a.lessonNumber - b.lessonNumber;
  });

  // Find first incomplete lesson with met prerequisites
  for (const lesson of sortedLessons) {
    const isCompleted = progressData.completedLessons?.includes(lesson.id);
    const prerequisitesMet = arePrerequisitesMet(lesson.id, progressData);
    const phaseUnlocked = isPhaseUnlocked(lesson.phase, progressData);

    if (!isCompleted && prerequisitesMet && phaseUnlocked) {
      return {
        lessonId: lesson.id,
        reason: 'Next lesson in sequence',
        strategy: STRATEGY.SEQUENTIAL
      };
    }
  }

  // All lessons complete
  return {
    lessonId: null,
    reason: 'All lessons completed',
    strategy: STRATEGY.SEQUENTIAL
  };
}

/**
 * Check if user needs review lessons
 * @param {Object} progressData - User progress data
 * @param {Object[]} allLessons - All available lessons
 * @returns {{lessonId: string|null, reason: string, strategy: string}} Recommendation
 */
function checkForReviewNeed(progressData, allLessons) {
  // Calculate overall accuracy
  const overallAccuracy = progressData.overallStats?.accuracy || 0;

  // If overall accuracy is low, recommend review lessons
  if (overallAccuracy < THRESHOLDS.REVIEW_TRIGGER && overallAccuracy > 0) {
    // Find an incomplete review lesson
    const reviewLessons = allLessons.filter(lesson =>
      lesson.id.startsWith('review-')
    );

    for (const reviewLesson of reviewLessons) {
      const isCompleted = progressData.completedLessons?.includes(reviewLesson.id);
      const phaseUnlocked = isPhaseUnlocked(reviewLesson.phase, progressData);

      if (!isCompleted && phaseUnlocked) {
        return {
          lessonId: reviewLesson.id,
          reason: `Accuracy below ${THRESHOLDS.REVIEW_TRIGGER * 100}% - review recommended`,
          strategy: STRATEGY.REVIEW_TRIGGERED
        };
      }
    }
  }

  // Check for specific weak qualities
  const weakQualities = identifyWeakQualities(progressData, allLessons);
  if (weakQualities.length > 0) {
    // Find a review lesson that targets the weakest quality
    const weakestQuality = weakQualities[0].quality;

    const targetedReview = allLessons.find(lesson =>
      lesson.id.startsWith('review-') &&
      lesson.quality === weakestQuality &&
      !progressData.completedLessons?.includes(lesson.id)
    );

    if (targetedReview && isPhaseUnlocked(targetedReview.phase, progressData)) {
      return {
        lessonId: targetedReview.id,
        reason: `Weak quality detected: ${weakestQuality}`,
        strategy: STRATEGY.REVIEW_TRIGGERED
      };
    }
  }

  return {
    lessonId: null,
    reason: 'No review needed',
    strategy: STRATEGY.REVIEW_TRIGGERED
  };
}

/**
 * Mastery-based recommendation (skip ahead if doing well)
 * @param {Object} progressData - User progress data
 * @param {Object[]} allLessons - All available lessons
 * @returns {{lessonId: string|null, reason: string, strategy: string}} Recommendation
 */
function getMasteryBasedRecommendation(progressData, allLessons) {
  const overallAccuracy = progressData.overallStats?.accuracy || 0;

  // If showing mastery, recommend more challenging content
  if (overallAccuracy >= THRESHOLDS.MASTERY) {
    // Find the highest phase lesson that's available and incomplete
    const sortedLessons = [...allLessons].sort((a, b) => {
      if (a.phase !== b.phase) {
        return b.phase - a.phase; // Higher phase first
      }
      return a.lessonNumber - b.lessonNumber;
    });

    for (const lesson of sortedLessons) {
      const isCompleted = progressData.completedLessons?.includes(lesson.id);
      const prerequisitesMet = arePrerequisitesMet(lesson.id, progressData);
      const phaseUnlocked = isPhaseUnlocked(lesson.phase, progressData);

      if (!isCompleted && prerequisitesMet && phaseUnlocked) {
        return {
          lessonId: lesson.id,
          reason: `High mastery (${Math.round(overallAccuracy * 100)}%) - advancing to challenging content`,
          strategy: STRATEGY.MASTERY_SKIP
        };
      }
    }
  }

  // Fall back to sequential if not showing mastery
  return getSequentialRecommendation(progressData, allLessons);
}

/**
 * Quality-targeted recommendation (focus on weak areas)
 * @param {Object} progressData - User progress data
 * @param {Object[]} allLessons - All available lessons
 * @returns {{lessonId: string|null, reason: string, strategy: string}} Recommendation
 */
function getQualityTargetedRecommendation(progressData, allLessons) {
  const weakQualities = identifyWeakQualities(progressData, allLessons);

  if (weakQualities.length > 0) {
    const targetQuality = weakQualities[0].quality;

    // Find an incomplete lesson for this quality
    const targetedLesson = allLessons.find(lesson =>
      lesson.quality === targetQuality &&
      !progressData.completedLessons?.includes(lesson.id) &&
      arePrerequisitesMet(lesson.id, progressData) &&
      isPhaseUnlocked(lesson.phase, progressData)
    );

    if (targetedLesson) {
      return {
        lessonId: targetedLesson.id,
        reason: `Targeting weak quality: ${targetQuality}`,
        strategy: STRATEGY.QUALITY_TARGETED
      };
    }
  }

  // Fall back to sequential if no weak qualities or no targeted lessons
  return getSequentialRecommendation(progressData, allLessons);
}

/**
 * Identify weak qualities based on lesson performance
 * @param {Object} progressData - User progress data
 * @param {Object[]} allLessons - All available lessons
 * @returns {Array<{quality: string, accuracy: number}>} Weak qualities sorted by accuracy
 */
function identifyWeakQualities(progressData, allLessons) {
  if (!progressData.lessonProgress) {
    return [];
  }

  const qualityAccuracy = {};

  // Calculate average accuracy per quality
  Object.entries(progressData.lessonProgress).forEach(([lessonId, progress]) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson || progress.accuracy === undefined) {
      return;
    }

    if (!qualityAccuracy[lesson.quality]) {
      qualityAccuracy[lesson.quality] = {
        totalAccuracy: 0,
        count: 0
      };
    }

    qualityAccuracy[lesson.quality].totalAccuracy += progress.accuracy;
    qualityAccuracy[lesson.quality].count++;
  });

  // Find qualities below threshold
  const weakQualities = Object.entries(qualityAccuracy)
    .map(([quality, data]) => ({
      quality,
      accuracy: data.totalAccuracy / data.count
    }))
    .filter(q => q.accuracy < THRESHOLDS.WEAK_QUALITY)
    .sort((a, b) => a.accuracy - b.accuracy); // Weakest first

  return weakQualities;
}

/**
 * Get next lessons (plural) for a user
 * Returns multiple recommendations for user choice
 * @param {Object} progressData - User progress data
 * @param {number} count - Number of recommendations (default 3)
 * @returns {Array<{lessonId: string, reason: string, priority: number}>} Recommendations
 */
export function getMultipleRecommendations(progressData, count = 3) {
  const recommendations = [];
  const allLessons = getAllLessons();

  // 1. Primary recommendation (highest priority)
  const primary = getRecommendedLesson(progressData, STRATEGY.SEQUENTIAL);
  if (primary.lessonId) {
    recommendations.push({
      lessonId: primary.lessonId,
      reason: primary.reason,
      priority: 1
    });
  }

  // 2. Review recommendation if needed
  const review = checkForReviewNeed(progressData, allLessons);
  if (review.lessonId && !recommendations.find(r => r.lessonId === review.lessonId)) {
    recommendations.push({
      lessonId: review.lessonId,
      reason: review.reason,
      priority: 2
    });
  }

  // 3. Quality-targeted recommendation
  const qualityTargeted = getQualityTargetedRecommendation(progressData, allLessons);
  if (qualityTargeted.lessonId && !recommendations.find(r => r.lessonId === qualityTargeted.lessonId)) {
    recommendations.push({
      lessonId: qualityTargeted.lessonId,
      reason: qualityTargeted.reason,
      priority: 3
    });
  }

  // 4. If we need more, add incomplete lessons with met prerequisites
  if (recommendations.length < count) {
    const available = allLessons
      .filter(lesson =>
        !progressData.completedLessons?.includes(lesson.id) &&
        arePrerequisitesMet(lesson.id, progressData) &&
        isPhaseUnlocked(lesson.phase, progressData) &&
        !recommendations.find(r => r.lessonId === lesson.id)
      )
      .sort((a, b) => {
        if (a.phase !== b.phase) return a.phase - b.phase;
        return a.lessonNumber - b.lessonNumber;
      })
      .slice(0, count - recommendations.length);

    available.forEach((lesson, index) => {
      recommendations.push({
        lessonId: lesson.id,
        reason: 'Available lesson',
        priority: 4 + index
      });
    });
  }

  return recommendations.slice(0, count);
}

/**
 * Check if user should be encouraged to take a break
 * @param {Object} progressData - User progress data
 * @returns {{shouldBreak: boolean, reason: string}} Break recommendation
 */
export function checkForBreakRecommendation(progressData) {
  const lastPracticed = progressData.overallStats?.lastPracticed;

  if (!lastPracticed) {
    return { shouldBreak: false, reason: '' };
  }

  const lastPracticedDate = new Date(lastPracticed);
  const now = new Date();
  const hoursSinceLastPractice = (now - lastPracticedDate) / (1000 * 60 * 60);

  // If practiced in the last 2 hours and accuracy is declining
  if (hoursSinceLastPractice < 2) {
    const recentAccuracy = calculateRecentAccuracy(progressData);
    const overallAccuracy = progressData.overallStats?.accuracy || 0;

    if (recentAccuracy < overallAccuracy - 0.1) {
      return {
        shouldBreak: true,
        reason: 'Recent accuracy declining - consider taking a break'
      };
    }
  }

  return { shouldBreak: false, reason: '' };
}

/**
 * Calculate accuracy from recent lessons
 * @param {Object} progressData - User progress data
 * @param {number} recentCount - Number of recent lessons to consider
 * @returns {number} Recent accuracy (0-1)
 */
function calculateRecentAccuracy(progressData, recentCount = 3) {
  if (!progressData.lessonProgress) {
    return 0;
  }

  // Get lessons sorted by last attempted
  const lessons = Object.entries(progressData.lessonProgress)
    .filter(([_, progress]) => progress.lastAttempted)
    .sort((a, b) => {
      return new Date(b[1].lastAttempted) - new Date(a[1].lastAttempted);
    })
    .slice(0, recentCount);

  if (lessons.length === 0) {
    return 0;
  }

  const totalAccuracy = lessons.reduce((sum, [_, progress]) => {
    return sum + (progress.accuracy || 0);
  }, 0);

  return totalAccuracy / lessons.length;
}

/**
 * Get user's learning insights
 * @param {Object} progressData - User progress data
 * @param {Object[]} allLessons - All available lessons
 * @returns {Object} Learning insights
 */
export function getLearningInsights(progressData, allLessons) {
  const weakQualities = identifyWeakQualities(progressData, allLessons);
  const overallAccuracy = progressData.overallStats?.accuracy || 0;
  const recentAccuracy = calculateRecentAccuracy(progressData);

  return {
    overallAccuracy,
    recentAccuracy,
    trend: recentAccuracy > overallAccuracy ? 'improving' : 'declining',
    weakQualities: weakQualities.slice(0, 3), // Top 3 weak qualities
    lessonsCompleted: progressData.completedLessons?.length || 0,
    totalTime: progressData.overallStats?.totalTime || 0,
    needsReview: overallAccuracy < THRESHOLDS.REVIEW_TRIGGER
  };
}
