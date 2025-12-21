import { useRef, useEffect, memo } from 'react';
import { theme } from '../theme';

function SequencerGridComponent({ sequence, onToggleStep, currentStep, bpm, isEditable, hideNotes }) {
  const tracks = [
    { label: 'HH', name: 'Hi-Hat' },
    { label: 'SN', name: 'Snare' },
    { label: 'KD', name: 'Kick' },
  ];

  const steps = 16; // 2 measures × 8 eighth notes
  const prevStepRef = useRef(currentStep);
  const playheadRef = useRef(null);
  const stepStartTimeRef = useRef(Date.now());
  const animationFrameRef = useRef(null);

  // Calculate step duration in milliseconds (eighth notes)
  const stepDuration = (60 / bpm) * 1000 / 2;

  const handleCellClick = (trackIndex, stepIndex) => {
    if (isEditable && onToggleStep) {
      onToggleStep(trackIndex, stepIndex);
    }
  };

  // Detect if we wrapped around
  const isWrapping = prevStepRef.current > currentStep && currentStep === 0;

  // Reset step start time when currentStep changes
  useEffect(() => {
    stepStartTimeRef.current = Date.now();
    prevStepRef.current = currentStep;
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
      const playheadPosition = ((currentStep + progress) / 16) * 100;

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
  }, [currentStep, stepDuration]);

  return (
    <div style={{ width: '100%', maxWidth: '100%', position: 'relative' }}>
      {/* Measure markers */}
      <div style={{ display: 'flex', marginBottom: theme.spacing.xs, paddingLeft: '60px' }}>
        {[1, 2].map((measure) => {
          return (
            <div
              key={measure}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.secondary,
                borderLeft: measure === 1 ? 'none' : `2px solid ${theme.colors.border.measure}`,
              }}
            >
              {measure}
            </div>
          );
        })}
      </div>

      {/* Playhead bar */}
      {currentStep >= 0 && (
        <div
          ref={playheadRef}
          style={{
            position: 'absolute',
            left: '60px', // Will be updated via ref
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

      {/* Grid */}
      <div style={{ width: '100%' }}>
        {tracks.map((track, trackIndex) => (
          <div
            key={track.label}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              marginBottom: '4px',
            }}
          >
            {/* Track label */}
            <div
              style={{
                width: '50px',
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                marginRight: '10px',
                textAlign: 'right',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              title={track.name}
            >
              {track.label}
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', gap: '2px', flex: 1 }}>
              {Array.from({ length: steps }).map((_, stepIndex) => {
                const isActive = sequence[trackIndex][stepIndex];
                const isCurrentStep = stepIndex === currentStep;
                const isMeasureBoundary = stepIndex === 8;

                return (
                  <button
                    key={stepIndex}
                    onClick={() => handleCellClick(trackIndex, stepIndex)}
                    style={{
                      flex: 1,
                      minWidth: '20px',
                      height: '40px',
                      border: `1px solid ${theme.colors.border.dark}`,
                      borderLeft: isMeasureBoundary ? `2px solid ${theme.colors.border.measure}` : `1px solid ${theme.colors.border.dark}`,
                      background: (isActive && !hideNotes) ? theme.colors.primary : theme.colors.bg.grid,
                      cursor: isEditable ? 'pointer' : 'default',
                      outline: isCurrentStep ? `2px solid ${theme.colors.highlight}` : 'none',
                      outlineOffset: '-2px',
                      transition: 'background 0.1s',
                    }}
                    disabled={!isEditable}
                    title={`${track.label} - Step ${stepIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary grid re-renders
export const SequencerGrid = memo(SequencerGridComponent, (prevProps, nextProps) => {
  // Only re-render if sequence, currentStep, bpm, isEditable, or hideNotes changes
  // Playhead animation is handled internally via requestAnimationFrame
  return (
    prevProps.sequence === nextProps.sequence &&
    prevProps.currentStep === nextProps.currentStep &&
    prevProps.bpm === nextProps.bpm &&
    prevProps.isEditable === nextProps.isEditable &&
    prevProps.hideNotes === nextProps.hideNotes
  );
});
