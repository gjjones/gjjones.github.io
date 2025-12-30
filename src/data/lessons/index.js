/**
 * Lesson Registry
 *
 * This file imports all lesson content and registers it with the curriculum loader.
 * Import this file early in the application lifecycle to ensure lessons are available.
 */

import { registerLessons } from '../../utils/curriculumLoader.js';
import LESSON_1 from './lesson1.js';
import LESSON_2 from './lesson2.js';
import LESSON_3 from './lesson3.js';
import LESSON_4 from './lesson4.js';
import LESSON_5 from './lesson5.js';
import LESSON_6 from './lesson6.js';
import LESSON_7 from './lesson7.js';
import LESSON_8 from './lesson8.js';
import LESSON_9 from './lesson9.js';
import { lesson10 as LESSON_10 } from './lesson10.js';
import { lesson11 as LESSON_11 } from './lesson11.js';
import { lesson12 as LESSON_12 } from './lesson12.js';
import { lesson13 as LESSON_13 } from './lesson13.js';
import { lesson14 as LESSON_14 } from './lesson14.js';

/**
 * All available lessons
 * Add new lessons to this array as they are created
 */
const ALL_LESSONS = [
  LESSON_1,
  LESSON_2,
  LESSON_3,
  LESSON_4,
  LESSON_5,
  LESSON_6,
  LESSON_7,
  LESSON_8,
  LESSON_9,
  LESSON_10,
  LESSON_11,
  LESSON_12,
  LESSON_13,
  LESSON_14,
];

/**
 * Initialize the curriculum by registering all lessons
 * Call this function once at application startup
 *
 * @returns {{successful: number, failed: number, errors: Array}} Registration results
 */
export function initializeCurriculum() {
  console.log('Initializing curriculum...');
  const results = registerLessons(ALL_LESSONS);

  console.log(
    `Curriculum initialized: ${results.successful} lessons registered, ${results.failed} failed`
  );

  if (results.failed > 0) {
    console.error('Lesson registration errors:', results.errors);
  }

  return results;
}

/**
 * Export all lessons for direct access if needed
 */
export { LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5, LESSON_6, LESSON_7, LESSON_8, LESSON_9, LESSON_10, LESSON_11, LESSON_12, LESSON_13, LESSON_14 };

export default ALL_LESSONS;
