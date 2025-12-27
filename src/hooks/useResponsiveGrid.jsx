/**
 * useResponsiveGrid Hook
 *
 * Provides responsive sizing for the sequencer grid based on viewport dimensions.
 * Handles window resize, calculates optimal cell sizes, and provides touch detection.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getResponsiveCellSize,
  calculateGridLayout,
  isMobileViewport,
  isTabletViewport,
  isTouchDevice,
  debounce
} from '../utils/mobileUtils.js';

/**
 * Hook for responsive grid sizing
 * @param {number} totalSteps - Total number of steps in the grid
 * @param {Object} options - Configuration options
 * @param {number} options.padding - Horizontal padding to account for (default 120)
 * @param {number} options.debounceMs - Resize debounce time (default 250)
 * @returns {Object} Responsive grid data
 */
export function useResponsiveGrid(totalSteps, { padding = 120, debounceMs = 250 } = {}) {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  const [gridLayout, setGridLayout] = useState(() =>
    calculateGridLayout(totalSteps, viewport.width)
  );

  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isTouch: false,
  });

  // Update viewport dimensions
  const updateViewport = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setViewport({ width, height });
    setGridLayout(calculateGridLayout(totalSteps, width));
    setDeviceInfo({
      isMobile: isMobileViewport(),
      isTablet: isTabletViewport(),
      isTouch: isTouchDevice(),
    });
  }, [totalSteps]);

  // Set up resize listener
  useEffect(() => {
    // Initial update
    updateViewport();

    // Create debounced resize handler
    const debouncedUpdate = debounce(updateViewport, debounceMs);

    // Add event listener
    window.addEventListener('resize', debouncedUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, [updateViewport, debounceMs]);

  // Calculate cell size with padding
  const cellSize = getResponsiveCellSize(viewport.width, totalSteps, padding);

  return {
    // Viewport info
    viewport,
    deviceInfo,

    // Grid layout
    cellSize,
    gridLayout,

    // Convenience flags
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    isTouch: deviceInfo.isTouch,
    isDesktop: !deviceInfo.isMobile && !deviceInfo.isTablet,
  };
}

/**
 * Hook for touch-friendly cell styling
 * Provides appropriate styling for touch vs mouse interaction
 * @param {boolean} isTouch - Whether device is touch-enabled
 * @returns {Object} Cell style properties
 */
export function useTouchCellStyles(isTouch) {
  return {
    minWidth: isTouch ? '40px' : '20px',
    minHeight: isTouch ? '40px' : '40px',
    cursor: isTouch ? 'default' : 'pointer',
    touchAction: isTouch ? 'manipulation' : 'auto', // Prevent double-tap zoom on touch devices
  };
}

/**
 * Hook for responsive button sizing
 * Provides touch-friendly button dimensions
 * @param {boolean} isTouch - Whether device is touch-enabled
 * @returns {Object} Button style properties
 */
export function useTouchButtonStyles(isTouch) {
  if (isTouch) {
    return {
      minWidth: '44px',    // iOS HIG standard
      minHeight: '44px',
      padding: '12px 20px',
      fontSize: '16px',    // Prevent iOS zoom on input focus
    };
  }

  return {
    minWidth: '32px',
    minHeight: '32px',
    padding: '8px 16px',
    fontSize: '14px',
  };
}

export default useResponsiveGrid;
