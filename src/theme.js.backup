/**
 * Centralized Design System
 *
 * All colors, spacing, typography, and other design tokens used throughout the app.
 * This makes it easy to maintain consistency and implement features like dark mode.
 */

export const theme = {
  colors: {
    // Primary colors
    primary: '#0066cc',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    highlight: '#f59e0b',

    // Backgrounds
    bg: {
      main: '#fff',
      secondary: '#f9f9f9',
      tertiary: '#f3f4f6',
      grid: '#222',
      error: '#fee',
    },

    // Borders
    border: {
      default: '#ddd',
      medium: '#ccc',
      dark: '#444',
      measure: '#888',
      error: '#fcc',
    },

    // Text colors
    text: {
      primary: '#333',
      secondary: '#999',
      tertiary: '#9ca3af',
      light: '#800',
      danger: '#ef4444',
      white: '#fff',
    },
  },

  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },

  typography: {
    fontFamily: {
      base: 'system-ui, -apple-system, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  borderRadius: {
    sm: '4px',
    base: '6px',
    md: '8px',
  },

  transitions: {
    fast: '0.15s ease',
    base: '0.2s ease',
    slow: '0.3s ease-in',
  },

  buttons: {
    // Single standardized button size for consistency
    size: {
      padding: '0.5rem 1.5rem',     // 8px × 24px
      fontSize: '1rem',              // 16px
      fontWeight: '500',             // medium
    },
  },

  other: {
    statusIndicatorSize: '10px',
  },
};

/**
 * Button variant helper
 * Returns consistent button styles based on variant type
 */
export const getButtonStyles = (variant = 'primary', { isActive = false, disabled = false } = {}) => {
  const variants = {
    primary: {
      background: theme.colors.primary,
      color: theme.colors.text.white,
      border: 'none',
      hoverOpacity: 0.9,
    },
    secondary: {
      background: 'transparent',
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border.default}`,
      hoverBackground: theme.colors.bg.secondary,
      hoverBorderColor: theme.colors.primary,
    },
    success: {
      background: theme.colors.success,
      color: theme.colors.text.white,
      border: `2px solid ${theme.colors.success}`,
      hoverOpacity: 0.9,
    },
    danger: {
      background: theme.colors.danger,
      color: theme.colors.text.white,
      border: `2px solid ${theme.colors.danger}`,
      hoverOpacity: 0.9,
    },
    warning: {
      background: theme.colors.warning,
      color: theme.colors.text.white,
      border: 'none',
      hoverOpacity: 0.9,
    },
    toggle: {
      background: isActive ? theme.colors.primary : theme.colors.bg.tertiary,
      color: isActive ? theme.colors.text.white : theme.colors.text.primary,
      border: `1px solid ${theme.colors.border.default}`,
      hoverBackground: isActive ? undefined : theme.colors.bg.secondary,
    },
  };

  const baseStyles = {
    // Standardized sizing for ALL buttons
    padding: theme.buttons.size.padding,
    fontSize: theme.buttons.size.fontSize,
    fontWeight: theme.buttons.size.fontWeight,

    // Standard interaction styles
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${theme.transitions.base}`,
    opacity: disabled ? 0.5 : 1,
  };

  return {
    ...baseStyles,
    ...variants[variant],
  };
};
