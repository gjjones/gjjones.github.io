/**
 * Shared Recharts Configuration
 *
 * Centralized styling and configuration for all dashboard charts
 * to ensure consistency with the app's theme system.
 */

import { theme } from '../../../theme.js';

/**
 * Color palette for charts mapped to mastery levels
 */
export const chartColors = {
  mastered: theme.colors.success,      // #22c55e (green)
  developing: theme.colors.warning,    // #f59e0b (orange)
  needsPractice: theme.colors.danger,  // #ef4444 (red)
  primary: theme.colors.primary,       // #0066cc (blue)
  completed: theme.colors.success,     // #22c55e (green)
  incomplete: theme.colors.border.medium, // #ccc (gray)
};

/**
 * Default axis styling matching theme
 */
export const defaultAxisStyle = {
  stroke: theme.colors.border.default,
  fontSize: theme.typography.fontSize.sm,
  fontFamily: theme.typography.fontFamily.base,
  fill: theme.colors.text.secondary,
};

/**
 * Default tooltip styling matching theme
 */
export const defaultTooltipStyle = {
  backgroundColor: theme.colors.bg.main,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.borderRadius.sm,
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.text.primary,
  padding: theme.spacing.sm,
};

/**
 * Default grid styling
 */
export const defaultGridStyle = {
  stroke: theme.colors.border.default,
  strokeDasharray: '3 3',
  opacity: 0.3,
};
