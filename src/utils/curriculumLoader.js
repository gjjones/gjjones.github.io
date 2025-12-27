/**
 * Curriculum Loader - Dynamic lesson loading and validation
 *
 * Handles loading lesson content, validating structure, and providing
 * access to curriculum data throughout the application.
 */

import { validateLessonMetadata } from '../data/curriculumStructure.js';
import { LESSON_TO_PHASE_MAP, getPhaseForLesson } from '../data/curriculumPhases.js';

/**
 * Lesson registry
 * Stores all loaded lessons for quick access
 */
const lessonRegistry = new Map();

/**
 * Register a lesson in the curriculum
 * @param {Object} lesson - Lesson metadata and content
 * @returns {{success: boolean, errors: string[]}} Registration result
 */
export function registerLesson(lesson) {
  // Validate lesson structure
  const validation = validateLessonMetadata(lesson);
  if (!validation.valid) {
    console.error(`Failed to register lesson ${lesson.id}:`, validation.errors);
    return {
      success: false,
      errors: validation.errors
    };
  }

  // Check if lesson phase matches curriculum phases
  const expectedPhase = LESSON_TO_PHASE_MAP[lesson.id];
  if (expectedPhase !== undefined && lesson.phase !== expectedPhase) {
    console.warn(
      `Phase mismatch for ${lesson.id}: expected ${expectedPhase}, got ${lesson.phase}`
    );
  }

  // Register the lesson
  lessonRegistry.set(lesson.id, lesson);

  return {
    success: true,
    errors: []
  };
}

/**
 * Get a lesson by ID
 * @param {string} lessonId - Lesson identifier
 * @returns {Object|null} Lesson data or null if not found
 */
export function getLesson(lessonId) {
  return lessonRegistry.get(lessonId) || null;
}

/**
 * Get all registered lessons
 * @returns {Object[]} Array of all lessons
 */
export function getAllLessons() {
  return Array.from(lessonRegistry.values());
}

/**
 * Get lessons by phase
 * @param {number} phaseNumber - Phase number (1, 2, or 3)
 * @returns {Object[]} Array of lessons in the phase
 */
export function getLessonsByPhase(phaseNumber) {
  return getAllLessons().filter(lesson => lesson.phase === phaseNumber);
}

/**
 * Get lessons by quality
 * @param {string} quality - Quality identifier
 * @returns {Object[]} Array of lessons teaching this quality
 */
export function getLessonsByQuality(quality) {
  return getAllLessons().filter(lesson => lesson.quality === quality);
}

/**
 * Check if all prerequisites for a lesson are met
 * @param {string} lessonId - Lesson to check
 * @param {Object} progressData - User progress data
 * @returns {boolean} Whether prerequisites are met
 */
export function arePrerequisitesMet(lessonId, progressData) {
  const lesson = getLesson(lessonId);
  if (!lesson) {
    return false;
  }

  // If no prerequisites, lesson is available
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
    return true;
  }

  // Check if all prerequisite lessons are completed
  return lesson.prerequisites.every(prereqId => {
    const prereqProgress = progressData.lessonProgress?.[prereqId];
    return prereqProgress?.completed === true;
  });
}

/**
 * Get available lessons for a user based on their progress
 * @param {Object} progressData - User progress data
 * @returns {Object[]} Array of available lessons
 */
export function getAvailableLessons(progressData) {
  return getAllLessons().filter(lesson =>
    arePrerequisitesMet(lesson.id, progressData)
  );
}

/**
 * Get a specific pattern from a lesson
 * @param {string} lessonId - Lesson identifier
 * @param {number} patternIndex - Pattern index (0-based)
 * @returns {Object|null} Pattern data or null if not found
 */
export function getPattern(lessonId, patternIndex) {
  const lesson = getLesson(lessonId);
  if (!lesson || !lesson.patterns || !lesson.patterns[patternIndex]) {
    return null;
  }

  return lesson.patterns[patternIndex];
}

/**
 * Get all patterns for a lesson
 * @param {string} lessonId - Lesson identifier
 * @returns {Object[]} Array of patterns or empty array if not found
 */
export function getPatterns(lessonId) {
  const lesson = getLesson(lessonId);
  return lesson?.patterns || [];
}

/**
 * Get lesson metadata without patterns (lighter payload)
 * @param {string} lessonId - Lesson identifier
 * @returns {Object|null} Lesson metadata without patterns
 */
export function getLessonMetadata(lessonId) {
  const lesson = getLesson(lessonId);
  if (!lesson) {
    return null;
  }

  // Return lesson without patterns
  const { patterns, ...metadata } = lesson;
  return metadata;
}

/**
 * Get all lesson metadata (without patterns)
 * Useful for lesson menus and navigation
 * @returns {Object[]} Array of lesson metadata
 */
export function getAllLessonMetadata() {
  return getAllLessons().map(lesson => {
    const { patterns, ...metadata } = lesson;
    return metadata;
  });
}

/**
 * Search lessons by title or concept
 * @param {string} searchTerm - Search query
 * @returns {Object[]} Matching lessons
 */
export function searchLessons(searchTerm) {
  const query = searchTerm.toLowerCase();
  return getAllLessons().filter(lesson =>
    lesson.title.toLowerCase().includes(query) ||
    lesson.concept.toLowerCase().includes(query) ||
    lesson.description.toLowerCase().includes(query)
  );
}

/**
 * Get lesson statistics
 * @returns {{total: number, byPhase: Object, byQuality: Object}} Curriculum stats
 */
export function getCurriculumStats() {
  const allLessons = getAllLessons();

  // Count lessons by phase
  const byPhase = {
    1: 0,
    2: 0,
    3: 0
  };

  // Count lessons by quality
  const byQuality = {};

  allLessons.forEach(lesson => {
    // Phase count
    if (byPhase[lesson.phase] !== undefined) {
      byPhase[lesson.phase]++;
    }

    // Quality count
    if (!byQuality[lesson.quality]) {
      byQuality[lesson.quality] = 0;
    }
    byQuality[lesson.quality]++;
  });

  return {
    total: allLessons.length,
    byPhase,
    byQuality
  };
}

/**
 * Clear all registered lessons
 * Useful for testing or reloading curriculum
 */
export function clearRegistry() {
  lessonRegistry.clear();
}

/**
 * Batch register multiple lessons
 * @param {Object[]} lessons - Array of lessons to register
 * @returns {{successful: number, failed: number, errors: Object[]}} Registration results
 */
export function registerLessons(lessons) {
  const results = {
    successful: 0,
    failed: 0,
    errors: []
  };

  lessons.forEach(lesson => {
    const result = registerLesson(lesson);
    if (result.success) {
      results.successful++;
    } else {
      results.failed++;
      results.errors.push({
        lessonId: lesson.id,
        errors: result.errors
      });
    }
  });

  return results;
}

/**
 * Export curriculum data for backup
 * @returns {Object} Complete curriculum data
 */
export function exportCurriculum() {
  return {
    lessons: getAllLessons(),
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };
}

/**
 * Import curriculum data from backup
 * @param {Object} curriculumData - Curriculum data to import
 * @returns {{success: boolean, message: string}} Import result
 */
export function importCurriculum(curriculumData) {
  if (!curriculumData.lessons || !Array.isArray(curriculumData.lessons)) {
    return {
      success: false,
      message: 'Invalid curriculum data: missing lessons array'
    };
  }

  // Clear existing registry
  clearRegistry();

  // Register all lessons
  const results = registerLessons(curriculumData.lessons);

  return {
    success: results.failed === 0,
    message: `Imported ${results.successful} lessons, ${results.failed} failed`,
    details: results
  };
}

/**
 * Validate entire curriculum consistency
 * Checks for broken references, missing prerequisites, etc.
 * @returns {{valid: boolean, warnings: string[], errors: string[]}} Validation results
 */
export function validateCurriculum() {
  const warnings = [];
  const errors = [];
  const allLessons = getAllLessons();
  const allLessonIds = new Set(allLessons.map(l => l.id));

  allLessons.forEach(lesson => {
    // Check prerequisites exist
    lesson.prerequisites?.forEach(prereqId => {
      if (!allLessonIds.has(prereqId)) {
        errors.push(`Lesson ${lesson.id} references non-existent prerequisite: ${prereqId}`);
      }
    });

    // Check nextLessons exist
    lesson.nextLessons?.forEach(nextId => {
      if (!allLessonIds.has(nextId)) {
        warnings.push(`Lesson ${lesson.id} references non-existent next lesson: ${nextId}`);
      }
    });

    // Check phase consistency
    const expectedPhase = LESSON_TO_PHASE_MAP[lesson.id];
    if (expectedPhase !== undefined && lesson.phase !== expectedPhase) {
      warnings.push(`Phase mismatch for ${lesson.id}: expected ${expectedPhase}, got ${lesson.phase}`);
    }

    // Check pattern count
    if (lesson.patterns && lesson.patterns.length !== 10) {
      warnings.push(`Lesson ${lesson.id} has ${lesson.patterns.length} patterns (expected 10)`);
    }
  });

  return {
    valid: errors.length === 0,
    warnings,
    errors
  };
}
