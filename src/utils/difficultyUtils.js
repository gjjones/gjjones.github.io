/**
 * Difficulty utility functions for filtering and managing pattern difficulty levels
 */

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];

export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    color: '#22c55e', // Green
    description: 'Foundational patterns with clear, simple concepts'
  },
  medium: {
    label: 'Medium',
    color: '#f59e0b', // Amber
    description: 'Skill development with variations and combinations'
  },
  hard: {
    label: 'Hard',
    color: '#ef4444', // Red
    description: 'Mastery challenges with complex syncopation'
  }
};

/**
 * Filters patterns to only those matching the specified difficulty
 *
 * @param {Array} patterns - Array of pattern objects
 * @param {string} difficulty - Difficulty level to filter by ('easy', 'medium', 'hard')
 * @returns {Array} Filtered array of patterns
 *
 * @example
 * const easyPatterns = filterPatternsByDifficulty(lesson.patterns, 'easy');
 */
export function filterPatternsByDifficulty(patterns, difficulty) {
  if (!difficulty) return patterns;
  return patterns.filter(p => p.difficulty === difficulty);
}

/**
 * Filters patterns to only those matching any of the specified difficulties
 *
 * @param {Array} patterns - Array of pattern objects
 * @param {string[]} difficulties - Array of difficulty levels to include
 * @returns {Array} Filtered array of patterns
 *
 * @example
 * // Get medium and hard patterns only
 * const advancedPatterns = getPatternsByDifficulties(lesson.patterns, ['medium', 'hard']);
 */
export function getPatternsByDifficulties(patterns, difficulties) {
  if (!difficulties || difficulties.length === 0) return patterns;
  return patterns.filter(p => difficulties.includes(p.difficulty));
}

/**
 * Gets the configuration object for a given difficulty level
 *
 * @param {string} difficulty - Difficulty level ('easy', 'medium', 'hard')
 * @returns {Object} Configuration object with label, color, and description
 *
 * @example
 * const config = getDifficultyConfig('easy');
 * console.log(config.label); // 'Easy'
 * console.log(config.color); // '#22c55e'
 */
export function getDifficultyConfig(difficulty) {
  return DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.medium;
}

/**
 * Gets patterns for first-time lesson experience (5 easy + 5 medium)
 *
 * @param {Array} patterns - Array of all lesson patterns
 * @returns {Array} Array of 10 patterns (5 easy + 5 medium)
 *
 * @example
 * const firstTimePatterns = getFirstTimeLessonPatterns(lesson.patterns);
 * // Returns 10 patterns for gentle onboarding
 */
export function getFirstTimeLessonPatterns(patterns) {
  const easy = filterPatternsByDifficulty(patterns, 'easy');
  const medium = filterPatternsByDifficulty(patterns, 'medium');
  return [...easy, ...medium];
}

/**
 * Gets patterns based on a starting difficulty level
 * Used for retaking lessons at higher difficulty levels
 *
 * @param {Array} patterns - Array of all lesson patterns
 * @param {string|null} startingDifficulty - Starting difficulty level
 *   - null or 'easy': Returns all patterns
 *   - 'medium': Returns medium + hard patterns
 *   - 'hard': Returns only hard patterns
 * @returns {Array} Filtered patterns
 *
 * @example
 * // Skip easy patterns for daily practice
 * const retakePatterns = getPatternsForRetake(lesson.patterns, 'medium');
 */
export function getPatternsForRetake(patterns, startingDifficulty) {
  if (!startingDifficulty || startingDifficulty === 'easy') {
    return patterns;
  }

  if (startingDifficulty === 'medium') {
    return getPatternsByDifficulties(patterns, ['medium', 'hard']);
  }

  if (startingDifficulty === 'hard') {
    return filterPatternsByDifficulty(patterns, 'hard');
  }

  return patterns;
}
