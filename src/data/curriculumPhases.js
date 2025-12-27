/**
 * Curriculum Phases - Organization of lessons into learning phases
 *
 * The curriculum is organized into phases for progressive learning:
 * - Phase 1: Core lessons (1-9) - Foundation rhythmic concepts
 * - Phase 2: Review lessons (R1-R3) - Quality distinction practice
 * - Phase 3: Expansion lessons (10-14) - Advanced qualities
 */

/**
 * Phase metadata
 * @typedef {Object} PhaseMetadata
 * @property {number} phaseNumber - Phase identifier (1, 2, or 3)
 * @property {string} title - Phase title
 * @property {string} description - What this phase focuses on
 * @property {string[]} lessonIds - Lesson IDs in this phase
 * @property {string} unlockCondition - Description of how to unlock this phase
 */

/**
 * Phase 1: Core Lessons (Foundation)
 * Lessons 1-9 cover the fundamental rhythmic qualities
 */
export const PHASE_1_CORE = {
  phaseNumber: 1,
  title: 'Foundation Rhythms',
  description: 'Master the core building blocks of drum patterns',
  lessonIds: [
    'lesson-1-kick-snare-skeleton',
    'lesson-2-the-ands',
    'lesson-3-backbeat-vs-displaced',
    'lesson-4-ghost-notes',
    'lesson-5-offbeat-hi-hat',
    'lesson-6-combining-qualities',
    'lesson-7-cross-rhythms',
    'lesson-8-polyrhythms',
    'lesson-9-tom-fills'
  ],
  unlockCondition: 'Available from start'
};

/**
 * Phase 2: Review Lessons (Quality Distinction)
 * Review lessons R1-R3 focus on identifying and distinguishing qualities
 * These are critical for developing ear training beyond transcription
 */
export const PHASE_2_REVIEW = {
  phaseNumber: 2,
  title: 'Quality Distinction',
  description: 'Practice identifying rhythmic qualities by ear',
  lessonIds: [
    'review-1-downbeat-vs-upbeat',
    'review-2-backbeat-variations',
    'review-3-ghost-note-detection'
  ],
  unlockCondition: 'Complete Phase 1 with 70% accuracy or higher'
};

/**
 * Phase 3: Expansion Lessons (Advanced Qualities)
 * Lessons 10-14 introduce new instruments and advanced concepts
 */
export const PHASE_3_EXPANSION = {
  phaseNumber: 3,
  title: 'Advanced Concepts',
  description: 'Explore swing, ride cymbal, syncopation, and more',
  lessonIds: [
    'lesson-10-swing-feel',
    'lesson-11-ride-cymbal',
    'lesson-12-syncopation-emphasis',
    'lesson-13-half-time-feel',
    'lesson-14-crash-accents'
  ],
  unlockCondition: 'Complete Phase 2 or achieve 80% accuracy in Phase 1'
};

/**
 * All phases in order
 */
export const CURRICULUM_PHASES = [
  PHASE_1_CORE,
  PHASE_2_REVIEW,
  PHASE_3_EXPANSION
];

/**
 * Total curriculum statistics
 */
export const CURRICULUM_STATS = {
  totalLessons: 17,
  coreLessons: 9,
  reviewLessons: 3,
  expansionLessons: 5,
  totalPhases: 3
};

/**
 * Lesson ID to phase mapping
 * Used for quick lookup of which phase a lesson belongs to
 */
export const LESSON_TO_PHASE_MAP = {
  // Phase 1: Core Lessons
  'lesson-1-kick-snare-skeleton': 1,
  'lesson-2-the-ands': 1,
  'lesson-3-backbeat-vs-displaced': 1,
  'lesson-4-ghost-notes': 1,
  'lesson-5-offbeat-hi-hat': 1,
  'lesson-6-combining-qualities': 1,
  'lesson-7-cross-rhythms': 1,
  'lesson-8-polyrhythms': 1,
  'lesson-9-tom-fills': 1,

  // Phase 2: Review Lessons
  'review-1-downbeat-vs-upbeat': 2,
  'review-2-backbeat-variations': 2,
  'review-3-ghost-note-detection': 2,

  // Phase 3: Expansion Lessons
  'lesson-10-swing-feel': 3,
  'lesson-11-ride-cymbal': 3,
  'lesson-12-syncopation-emphasis': 3,
  'lesson-13-half-time-feel': 3,
  'lesson-14-crash-accents': 3
};

/**
 * Get phase metadata by phase number
 * @param {number} phaseNumber - Phase number (1, 2, or 3)
 * @returns {PhaseMetadata|null} Phase metadata or null if not found
 */
export function getPhaseByNumber(phaseNumber) {
  return CURRICULUM_PHASES.find(phase => phase.phaseNumber === phaseNumber) || null;
}

/**
 * Get phase for a specific lesson
 * @param {string} lessonId - Lesson identifier
 * @returns {PhaseMetadata|null} Phase metadata or null if not found
 */
export function getPhaseForLesson(lessonId) {
  const phaseNumber = LESSON_TO_PHASE_MAP[lessonId];
  return phaseNumber ? getPhaseByNumber(phaseNumber) : null;
}

/**
 * Check if a phase is unlocked based on progress
 * @param {number} phaseNumber - Phase to check
 * @param {Object} progressData - User progress data
 * @returns {boolean} Whether the phase is unlocked
 */
export function isPhaseUnlocked(phaseNumber, progressData) {
  if (phaseNumber === 1) {
    // Phase 1 is always unlocked
    return true;
  }

  if (phaseNumber === 2) {
    // Phase 2: Complete Phase 1 with 70% accuracy or higher
    const phase1Lessons = PHASE_1_CORE.lessonIds;
    const phase1Completed = phase1Lessons.every(lessonId =>
      progressData.lessonProgress?.[lessonId]?.completed
    );
    const phase1Accuracy = calculatePhaseAccuracy(1, progressData);
    return phase1Completed && phase1Accuracy >= 0.7;
  }

  if (phaseNumber === 3) {
    // Phase 3: Complete Phase 2 OR achieve 80% accuracy in Phase 1
    const phase2Lessons = PHASE_2_REVIEW.lessonIds;
    const phase2Completed = phase2Lessons.every(lessonId =>
      progressData.lessonProgress?.[lessonId]?.completed
    );

    const phase1Accuracy = calculatePhaseAccuracy(1, progressData);
    const phase1MasteryUnlock = phase1Accuracy >= 0.8;

    return phase2Completed || phase1MasteryUnlock;
  }

  return false;
}

/**
 * Calculate average accuracy for a phase
 * @param {number} phaseNumber - Phase number
 * @param {Object} progressData - User progress data
 * @returns {number} Average accuracy (0-1) or 0 if no data
 */
export function calculatePhaseAccuracy(phaseNumber, progressData) {
  const phase = getPhaseByNumber(phaseNumber);
  if (!phase || !progressData.lessonProgress) {
    return 0;
  }

  const lessonAccuracies = phase.lessonIds
    .map(lessonId => progressData.lessonProgress[lessonId]?.accuracy)
    .filter(accuracy => typeof accuracy === 'number');

  if (lessonAccuracies.length === 0) {
    return 0;
  }

  const sum = lessonAccuracies.reduce((acc, accuracy) => acc + accuracy, 0);
  return sum / lessonAccuracies.length;
}

/**
 * Get next recommended phase
 * @param {Object} progressData - User progress data
 * @returns {number|null} Next phase number or null if all complete
 */
export function getNextPhase(progressData) {
  // Check phases in order
  for (let i = 1; i <= 3; i++) {
    if (!isPhaseUnlocked(i, progressData)) {
      // Return previous phase if this one isn't unlocked yet
      return i - 1;
    }

    // Check if this phase is incomplete
    const phase = getPhaseByNumber(i);
    const hasIncompleteLesson = phase.lessonIds.some(
      lessonId => !progressData.lessonProgress?.[lessonId]?.completed
    );

    if (hasIncompleteLesson) {
      return i;
    }
  }

  // All phases complete
  return null;
}

/**
 * Get progress statistics for a phase
 * @param {number} phaseNumber - Phase number
 * @param {Object} progressData - User progress data
 * @returns {{completed: number, total: number, accuracy: number}} Phase stats
 */
export function getPhaseStats(phaseNumber, progressData) {
  const phase = getPhaseByNumber(phaseNumber);
  if (!phase) {
    return { completed: 0, total: 0, accuracy: 0 };
  }

  const completedLessons = phase.lessonIds.filter(
    lessonId => progressData.lessonProgress?.[lessonId]?.completed
  ).length;

  return {
    completed: completedLessons,
    total: phase.lessonIds.length,
    accuracy: calculatePhaseAccuracy(phaseNumber, progressData)
  };
}
