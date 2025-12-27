import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'warmupMode';
const WARMUP_REDUCTION = 15; // BPM

export function useWarmupMode() {
  // Lazy initialization from localStorage
  const [isWarmupMode, setIsWarmupMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to load warmup mode:', err);
    }
    return false; // Default: OFF
  });

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isWarmupMode));
    } catch (err) {
      console.error('Failed to save warmup mode:', err);
    }
  }, [isWarmupMode]);

  const toggleWarmupMode = useCallback(() => {
    setIsWarmupMode(prev => !prev);
  }, []);

  const applyWarmup = useCallback((tempo) => {
    if (!isWarmupMode) return tempo;

    const reducedTempo = tempo - WARMUP_REDUCTION;
    const MIN_BPM = 40; // Match BpmControl constraint
    return Math.max(reducedTempo, MIN_BPM);
  }, [isWarmupMode]);

  return {
    isWarmupMode,
    toggleWarmupMode,
    applyWarmup,
    warmupReduction: WARMUP_REDUCTION,
  };
}
