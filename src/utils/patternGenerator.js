/**
 * Pattern Generator - Constraint-based drum pattern generation
 *
 * Generates drum patterns based on constraints defined in lesson metadata.
 * Supports locked notes, placement rules, difficulty levels, and validation.
 */

/**
 * Difficulty level definitions
 */
export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

/**
 * Generate patterns for a lesson based on constraints
 * @param {Object} constraints - Lesson constraints
 * @param {number} count - Number of patterns to generate (default 100)
 * @param {number} targetCount - Target number of patterns to return (default 10)
 * @returns {Object[]} Array of generated patterns
 */
export function generatePatternsForLesson(constraints, count = 100, targetCount = 10) {
  const generatedPatterns = [];
  const maxAttempts = count * 2; // Prevent infinite loops
  let attempts = 0;

  while (generatedPatterns.length < count && attempts < maxAttempts) {
    attempts++;

    // Determine difficulty for this pattern
    const difficulty = getDifficultyForPattern(generatedPatterns.length, targetCount);

    // Generate a pattern
    const pattern = generatePattern(constraints, difficulty, generatedPatterns.length);

    if (pattern) {
      // Check if this pattern is unique
      if (!isDuplicate(pattern, generatedPatterns)) {
        generatedPatterns.push(pattern);
      }
    }
  }

  // Filter to top N patterns
  const selectedPatterns = selectBestPatterns(generatedPatterns, targetCount, constraints);

  return selectedPatterns;
}

/**
 * Generate a single pattern based on constraints
 * @param {Object} constraints - Lesson constraints
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @param {number} patternNumber - Pattern number (for ID)
 * @returns {Object|null} Generated pattern or null if generation fails
 */
export function generatePattern(constraints, difficulty, patternNumber) {
  const totalSteps = constraints.gridSize * constraints.measures;

  // Start with empty grid
  const pattern = {
    id: `pattern-${patternNumber + 1}`,
    grid: {},
    difficulty
  };

  // Apply locked placements (immutable notes)
  if (constraints.locked) {
    Object.entries(constraints.locked).forEach(([instrument, steps]) => {
      pattern.grid[instrument] = [...steps];
    });
  }

  // Generate placements for available instruments
  if (constraints.available && constraints.rules) {
    for (const instrument of constraints.available) {
      const rules = constraints.rules[instrument];
      if (!rules) continue;

      // Get difficulty-specific rules if available
      const difficultyRules = constraints.difficulty?.[difficulty]?.[instrument];
      const combinedRules = { ...rules, ...difficultyRules };

      // Generate valid placement for this instrument
      const placement = generateInstrumentPlacement(
        instrument,
        combinedRules,
        pattern.grid,
        totalSteps
      );

      if (placement.length > 0) {
        pattern.grid[instrument] = placement;
      }
    }
  }

  // Validate pattern
  if (!validatePattern(pattern, constraints)) {
    return null;
  }

  return pattern;
}

/**
 * Generate placement for a specific instrument
 * @param {string} instrument - Instrument identifier
 * @param {Object} rules - Placement rules
 * @param {Object} existingGrid - Existing pattern grid
 * @param {number} totalSteps - Total number of steps in pattern
 * @returns {number[]} Array of step indices
 */
function generateInstrumentPlacement(instrument, rules, existingGrid, totalSteps) {
  const placement = [];

  // Determine how many notes to place
  const noteCount = randomInt(rules.minNotes || 1, rules.maxNotes || 4);

  // Get allowed steps
  let allowedSteps = rules.allowedSteps === 'all'
    ? Array.from({ length: totalSteps }, (_, i) => i)
    : rules.allowedSteps || [];

  // Filter out steps to avoid
  if (rules.avoidSimultaneous) {
    allowedSteps = allowedSteps.filter(step => {
      return !rules.avoidSimultaneous.some(avoidInstrument => {
        return existingGrid[avoidInstrument]?.includes(step);
      });
    });
  }

  // Prefer certain steps if specified
  const preferredSteps = rules.preferredSteps || [];
  const preferredAvailable = preferredSteps.filter(step => allowedSteps.includes(step));

  // Place notes
  for (let i = 0; i < noteCount && allowedSteps.length > 0; i++) {
    let step;

    // 70% chance to use preferred steps if available
    if (preferredAvailable.length > 0 && Math.random() < 0.7) {
      step = randomChoice(preferredAvailable);
      // Remove from both lists
      preferredAvailable.splice(preferredAvailable.indexOf(step), 1);
      allowedSteps.splice(allowedSteps.indexOf(step), 1);
    } else {
      step = randomChoice(allowedSteps);
      allowedSteps.splice(allowedSteps.indexOf(step), 1);
      // Also remove from preferred if present
      const prefIndex = preferredAvailable.indexOf(step);
      if (prefIndex !== -1) {
        preferredAvailable.splice(prefIndex, 1);
      }
    }

    placement.push(step);

    // If avoidAdjacent, remove adjacent steps from allowed
    if (rules.avoidAdjacent) {
      allowedSteps = allowedSteps.filter(s =>
        Math.abs(s - step) > 1
      );
    }
  }

  // Sort placement for consistency
  return placement.sort((a, b) => a - b);
}

/**
 * Validate that a pattern meets all constraints
 * @param {Object} pattern - Pattern to validate
 * @param {Object} constraints - Lesson constraints
 * @returns {boolean} Whether pattern is valid
 */
export function validatePattern(pattern, constraints) {
  // Check locked notes are present and unchanged
  if (constraints.locked) {
    for (const [instrument, steps] of Object.entries(constraints.locked)) {
      const patternSteps = pattern.grid[instrument] || [];

      // Check that all locked steps are present
      if (!steps.every(step => patternSteps.includes(step))) {
        return false;
      }

      // Check that no extra notes were added to locked instruments
      if (patternSteps.length !== steps.length) {
        return false;
      }
    }
  }

  // Check available instruments meet their rules
  if (constraints.available && constraints.rules) {
    for (const instrument of constraints.available) {
      const rules = constraints.rules[instrument];
      if (!rules) continue;

      const placement = pattern.grid[instrument] || [];

      // Check note count constraints
      if (rules.minNotes !== undefined && placement.length < rules.minNotes) {
        return false;
      }
      if (rules.maxNotes !== undefined && placement.length > rules.maxNotes) {
        return false;
      }

      // Check requiredPatterns if specified
      if (rules.requiredPatterns) {
        const meetsRequirement = rules.requiredPatterns.some(required => {
          return required.steps.every(step => placement.includes(step));
        });

        if (!meetsRequirement) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Check if a pattern is a duplicate of existing patterns
 * @param {Object} pattern - Pattern to check
 * @param {Object[]} existingPatterns - Array of existing patterns
 * @returns {boolean} Whether pattern is a duplicate
 */
function isDuplicate(pattern, existingPatterns) {
  return existingPatterns.some(existing => {
    return patternsEqual(pattern, existing);
  });
}

/**
 * Check if two patterns are equal
 * @param {Object} pattern1 - First pattern
 * @param {Object} pattern2 - Second pattern
 * @returns {boolean} Whether patterns are equal
 */
function patternsEqual(pattern1, pattern2) {
  const instruments1 = Object.keys(pattern1.grid);
  const instruments2 = Object.keys(pattern2.grid);

  // Check same instruments
  if (instruments1.length !== instruments2.length) {
    return false;
  }

  // Check each instrument's placement
  return instruments1.every(instrument => {
    const steps1 = pattern1.grid[instrument] || [];
    const steps2 = pattern2.grid[instrument] || [];

    if (steps1.length !== steps2.length) {
      return false;
    }

    return steps1.every((step, i) => step === steps2[i]);
  });
}

/**
 * Select best patterns from generated set
 * @param {Object[]} patterns - Generated patterns
 * @param {number} count - Number of patterns to select
 * @param {Object} constraints - Lesson constraints
 * @returns {Object[]} Selected patterns
 */
function selectBestPatterns(patterns, count, constraints) {
  if (patterns.length <= count) {
    return patterns;
  }

  // Score each pattern
  const scoredPatterns = patterns.map(pattern => ({
    pattern,
    score: scorePattern(pattern, constraints)
  }));

  // Sort by score (higher is better)
  scoredPatterns.sort((a, b) => b.score - a.score);

  // Return top N patterns
  return scoredPatterns.slice(0, count).map(sp => sp.pattern);
}

/**
 * Score a pattern for quality (higher is better)
 * @param {Object} pattern - Pattern to score
 * @param {Object} constraints - Lesson constraints
 * @returns {number} Pattern score
 */
function scorePattern(pattern, constraints) {
  let score = 100; // Base score

  // Prefer patterns that use preferred steps
  if (constraints.rules) {
    Object.entries(constraints.rules).forEach(([instrument, rules]) => {
      const placement = pattern.grid[instrument] || [];
      const preferredSteps = rules.preferredSteps || [];

      // Count how many preferred steps are used
      const preferredCount = placement.filter(step =>
        preferredSteps.includes(step)
      ).length;

      // Bonus for using preferred steps
      score += preferredCount * 10;
    });
  }

  // Slight penalty for very simple patterns
  const totalNotes = Object.values(pattern.grid).reduce(
    (sum, steps) => sum + steps.length,
    0
  );

  if (totalNotes < 3) {
    score -= 20;
  }

  // Add randomness for diversity
  score += Math.random() * 10;

  return score;
}

/**
 * Get difficulty level for a pattern based on its position
 * @param {number} index - Pattern index
 * @param {number} total - Total number of patterns
 * @returns {string} Difficulty level
 */
function getDifficultyForPattern(index, total) {
  const position = index / total;

  if (position < 0.3) {
    return DIFFICULTY.EASY;
  } else if (position < 0.7) {
    return DIFFICULTY.MEDIUM;
  } else {
    return DIFFICULTY.HARD;
  }
}

/**
 * Random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random choice from array
 * @param {Array} array - Array to choose from
 * @returns {*} Random element
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Create example constraint set for Lesson 1
 * This demonstrates how to structure constraints for pattern generation
 */
export const EXAMPLE_LESSON_1_CONSTRAINTS = {
  gridSize: 8,
  measures: 2,
  instruments: ['HH', 'SN', 'KD'],

  locked: {
    SN: [2, 6, 10, 14] // Snare on beats 2 & 4 (correct)
  },

  available: ['KD'],

  rules: {
    KD: {
      minNotes: 1,
      maxNotes: 4,
      allowedSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      preferredSteps: [0, 8], // Downbeats (beats 1 & 3)
      avoidSimultaneous: ['SN'], // Don't place kick where snare is
      avoidAdjacent: false,
      requiredPatterns: [
        { steps: [0] },    // Must have kick on step 0, OR
        { steps: [8] },    // kick on step 8, OR
        { steps: [0, 8] }  // kick on both
      ]
    }
  },

  difficulty: {
    easy: {
      KD: {
        minNotes: 1,
        maxNotes: 2,
        preferredSteps: [0, 8]
      }
    },
    medium: {
      KD: {
        minNotes: 2,
        maxNotes: 3,
        allowedSteps: 'all'
      }
    },
    hard: {
      KD: {
        minNotes: 3,
        maxNotes: 4,
        allowedSteps: 'all'
      }
    }
  }
};

/**
 * Test pattern generation with example constraints
 * Useful for debugging and validation
 */
export function testGeneration() {
  const patterns = generatePatternsForLesson(EXAMPLE_LESSON_1_CONSTRAINTS, 100, 10);
  return patterns;
}
