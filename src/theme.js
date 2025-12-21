/**
 * Centralized Design System
 *
 * All colors, spacing, typography, and other design tokens used throughout the app.
 * This makes it easy to maintain consistency and implement features like dark mode.
 */

export const theme = {
  colors: {
    // Primary colors
    primary: '#06c',
    success: '#0a0',
    danger: '#c00',
    highlight: '#f90',

    // Backgrounds
    bg: {
      main: '#fff',
      secondary: '#f9f9f9',
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
      light: '#800',
      danger: '#c00',
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
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
    },
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
  },

  other: {
    statusIndicatorSize: '10px',
    transition: '0.15s ease',
  },
};
