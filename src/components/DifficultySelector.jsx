import { useState } from 'react';
import { theme } from '../theme';
import { DIFFICULTY_LEVELS } from '../utils/difficultyUtils';

/**
 * Difficulty selector button group
 * Allows users to choose which difficulty patterns to practice
 */
export function DifficultySelector({ onSelect, defaultDifficulty = 'all' }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(defaultDifficulty);

  const options = [
    { value: 'all', label: 'All', count: 15 },
    { value: DIFFICULTY_LEVELS.EASY, label: 'Easy', count: 5 },
    { value: DIFFICULTY_LEVELS.MEDIUM, label: 'Medium', count: 5 },
    { value: DIFFICULTY_LEVELS.HARD, label: 'Hard', count: 5 },
  ];

  const handleSelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (onSelect) {
      onSelect(difficulty);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.xs,
        marginTop: theme.spacing.md,
        flexWrap: 'wrap',
      }}
      onClick={(e) => {
        // Prevent parent button (lesson card) from being triggered
        e.stopPropagation();
      }}
    >
      {options.map((option) => {
        const isSelected = selectedDifficulty === option.value;

        return (
          <button
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(option.value);
            }}
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.md}`,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              background: isSelected ? theme.colors.primary : theme.colors.bg.primary,
              color: isSelected ? 'white' : theme.colors.text.secondary,
              border: `2px solid ${isSelected ? theme.colors.primary : theme.colors.border.default}`,
              borderRadius: theme.borderRadius.sm,
              cursor: 'pointer',
              transition: `all ${theme.transitions.base}`,
              flex: '1 1 auto',
              minWidth: 'fit-content',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.target.style.borderColor = theme.colors.primary;
                e.target.style.color = theme.colors.primary;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.target.style.borderColor = theme.colors.border.default;
                e.target.style.color = theme.colors.text.secondary;
              }
            }}
          >
            {option.label} ({option.count})
          </button>
        );
      })}
    </div>
  );
}
