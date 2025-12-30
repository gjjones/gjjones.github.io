import { getDifficultyConfig } from '../../utils/difficultyUtils.js';
import { theme } from '../../theme';

export function DifficultyBadge({ difficulty }) {
  if (!difficulty) return null;

  const config = getDifficultyConfig(difficulty);

  return (
    <div
      style={{
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        background: config.color,
        color: 'white',
        borderRadius: theme.borderRadius.sm,
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
      title={config.description}
    >
      <span>{config.label}</span>
    </div>
  );
}
