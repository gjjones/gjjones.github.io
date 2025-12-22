import { useRef, useEffect } from 'react';
import { theme } from '../theme';
import { BeatGrid } from './BeatGrid';

export function ListenMode({
  currentStep,
  totalSteps,
  stepsPerMeasure,
  measures,
  bpm
}) {
  const playheadRef = useRef(null);
  const stepStartTimeRef = useRef(Date.now());
  const animationFrameRef = useRef(null);

  // Calculate step duration based on measures and steps
  const division = totalSteps / measures / 4; // 4 quarter notes per measure
  const stepDuration = (60 / bpm) * 1000 / division;

  // Reset step start time when currentStep changes
  useEffect(() => {
    stepStartTimeRef.current = Date.now();
  }, [currentStep]);

  // Smooth playhead animation using requestAnimationFrame
  useEffect(() => {
    if (currentStep < 0) {
      // Not playing, cancel animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const updatePlayhead = () => {
      if (!playheadRef.current) return;

      const elapsed = Date.now() - stepStartTimeRef.current;
      const progress = Math.min(elapsed / stepDuration, 1);
      const playheadPosition = ((currentStep + progress) / totalSteps) * 100;

      const gridWidth = `calc(100% - 60px)`;
      const position = `calc(60px + ${gridWidth} * ${playheadPosition / 100})`;
      playheadRef.current.style.left = position;

      if (currentStep >= 0) {
        animationFrameRef.current = requestAnimationFrame(updatePlayhead);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updatePlayhead);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [currentStep, stepDuration, totalSteps]);

  return (
    <div style={{ width: '100%', maxWidth: '100%', position: 'relative' }}>
      {/* Beat grid (replaces measure markers) */}
      <BeatGrid
        measures={measures}
        stepsPerMeasure={stepsPerMeasure}
        currentStep={currentStep}
      />

      {/* Main listen mode content */}
      <div style={{
        width: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing.lg,
        }}>
          {/* Icon */}
          <div style={{
            fontSize: '120px',
            opacity: 0.3,
            userSelect: 'none',
          }}>
            🎧
          </div>

          {/* Text */}
          <div style={{
            fontSize: theme.typography.fontSize.xl,
            color: theme.colors.text.primary,
            textAlign: 'center',
          }}>
            Listen to the rhythm
          </div>
        </div>

        {/* Playhead bar */}
        {currentStep >= 0 && (
          <div
            ref={playheadRef}
            style={{
              position: 'absolute',
              left: '60px',
              top: '1.5rem',
              bottom: 0,
              width: '2px',
              background: 'rgba(255, 50, 50, 0.8)',
              pointerEvents: 'none',
              zIndex: 10,
              willChange: 'left',
            }}
          />
        )}
      </div>
    </div>
  );
}
