/**
 * Mobile Utilities - Responsive design helpers
 *
 * Provides utilities for responsive sizing, breakpoint detection,
 * and touch device support across the application.
 */

import { theme } from '../theme.js';

/**
 * Breakpoint definitions
 * These match the design specifications in the implementation plan
 */
export const BREAKPOINTS = {
  MOBILE: 600,      // Mobile portrait (< 600px)
  TABLET: 900,      // Tablet / Mobile landscape (600px - 900px)
  DESKTOP: 900,     // Desktop (> 900px)
};

/**
 * Grid cell sizing constants
 */
export const GRID_CELL = {
  MIN_SIZE: 40,       // Minimum tap target (iOS HIG: 44px, we use 40px)
  MAX_SIZE: 60,       // Maximum cell size for desktop
  DEFAULT_HEIGHT: 40, // Default cell height
};

/**
 * Get responsive cell size based on viewport width and total steps
 * @param {number} viewportWidth - Current viewport width in pixels
 * @param {number} totalSteps - Total number of steps in the grid
 * @param {number} padding - Padding/margin to account for (default 120px for labels + margins)
 * @returns {number} Cell size in pixels
 */
export function getResponsiveCellSize(viewportWidth, totalSteps, padding = 120) {
  const availableWidth = viewportWidth - padding;
  const calculatedSize = availableWidth / totalSteps;

  // Clamp between min and max
  return Math.max(
    GRID_CELL.MIN_SIZE,
    Math.min(GRID_CELL.MAX_SIZE, calculatedSize)
  );
}

/**
 * Check if current viewport is mobile
 * @returns {boolean} Whether viewport is mobile size
 */
export function isMobileViewport() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.MOBILE;
}

/**
 * Check if current viewport is tablet
 * @returns {boolean} Whether viewport is tablet size
 */
export function isTabletViewport() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.MOBILE && window.innerWidth < BREAKPOINTS.TABLET;
}

/**
 * Check if current viewport is desktop
 * @returns {boolean} Whether viewport is desktop size
 */
export function isDesktopViewport() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.DESKTOP;
}

/**
 * Check if device supports touch
 * @returns {boolean} Whether device has touch support
 */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get current viewport type
 * @returns {'mobile'|'tablet'|'desktop'} Viewport type
 */
export function getViewportType() {
  if (isMobileViewport()) return 'mobile';
  if (isTabletViewport()) return 'tablet';
  return 'desktop';
}

/**
 * Hook for responsive viewport detection
 * Returns viewport dimensions and breakpoint info
 * @returns {{width: number, height: number, isMobile: boolean, isTablet: boolean, isDesktop: boolean, isTouch: boolean}}
 */
export function useViewport() {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: isMobileViewport(),
    isTablet: isTabletViewport(),
    isDesktop: isDesktopViewport(),
    isTouch: isTouchDevice()
  };
}

/**
 * Calculate grid layout based on viewport
 * @param {number} totalSteps - Total steps in the pattern
 * @param {number} viewportWidth - Current viewport width
 * @returns {{cellSize: number, gridWidth: number, shouldScroll: boolean}} Grid layout
 */
export function calculateGridLayout(totalSteps, viewportWidth) {
  const cellSize = getResponsiveCellSize(viewportWidth, totalSteps);
  const gridWidth = cellSize * totalSteps;
  const shouldScroll = gridWidth > viewportWidth;

  return {
    cellSize,
    gridWidth,
    shouldScroll
  };
}

/**
 * Get touch-friendly button size
 * Returns appropriate button sizing for touch devices
 * @param {boolean} isTouch - Whether device is touch-enabled
 * @returns {{minWidth: string, minHeight: string, padding: string}}
 */
export function getTouchButtonSize(isTouch = isTouchDevice()) {
  if (isTouch) {
    return {
      minWidth: '44px',    // iOS HIG standard
      minHeight: '44px',
      padding: '12px 20px'
    };
  }

  return {
    minWidth: '32px',
    minHeight: '32px',
    padding: '8px 16px'
  };
}

/**
 * Media query helpers for CSS-in-JS
 */
export const mediaQueries = {
  mobile: `@media (max-width: ${BREAKPOINTS.MOBILE}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.MOBILE + 1}px) and (max-width: ${BREAKPOINTS.TABLET}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.TABLET + 1}px)`,
  touchDevice: '@media (hover: none) and (pointer: coarse)',
};

/**
 * Get responsive spacing based on viewport
 * @param {string} size - Size from theme.spacing (xs, sm, md, lg, xl)
 * @param {boolean} isMobile - Whether viewport is mobile
 * @returns {string} Responsive spacing value
 */
export function getResponsiveSpacing(size, isMobile = isMobileViewport()) {
  const baseSpacing = theme.spacing[size] || theme.spacing.md;

  // On mobile, reduce larger spacings to save screen space
  if (isMobile && (size === 'lg' || size === 'xl')) {
    return theme.spacing.md; // Cap at medium spacing on mobile
  }

  return baseSpacing;
}

/**
 * Get responsive font size based on viewport
 * @param {string} size - Size from theme.typography.fontSize
 * @param {boolean} isMobile - Whether viewport is mobile
 * @returns {string} Responsive font size
 */
export function getResponsiveFontSize(size, isMobile = isMobileViewport()) {
  const baseFontSize = theme.typography.fontSize[size] || theme.typography.fontSize.base;

  // Optionally adjust font sizes for mobile readability
  // For now, keep them the same
  return baseFontSize;
}

/**
 * Debounce function for window resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a resize observer callback with debouncing
 * @param {Function} callback - Callback to execute on resize
 * @param {number} debounceMs - Debounce time in ms (default 250)
 * @returns {Function} Debounced resize callback
 */
export function createResizeObserver(callback, debounceMs = 250) {
  return debounce(callback, debounceMs);
}
