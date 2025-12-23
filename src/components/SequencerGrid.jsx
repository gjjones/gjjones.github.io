import { useRef, useEffect, memo } from 'react';
import { theme } from '../theme';
import { BeatGrid } from './BeatGrid';

function SequencerGridComponent({ sequence, onToggleStep, currentStep, bpm, isEditable, hideNotes, highlightedCells = [], totalSteps, stepsPerMeasure, measures, getMusicalPosition, instruments }) {
  const tracks = instruments;
  const prevStepRef = useRef(currentStep);
  const playheadRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleCellClick = (trackIndex, stepIndex) => {
    if (isEditable && onToggleStep) {
      onToggleStep(trackIndex, stepIndex);
    }
  };

  // Detect if we wrapped around
  const isWrapping = prevStepRef.current > currentStep && currentStep === 0;

  // Track previous step
  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  // Smooth playhead animation using requestAnimationFrame
  // Query scheduler for precise musical position
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
      if (!playheadRef.current || !getMusicalPosition) return;

      // Query scheduler for current musical position
      const { currentStep: musicalStep, progress } = getMusicalPosition();
      const playheadPosition = ((musicalStep + progress) / totalSteps) * 100;

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
  }, [currentStep, totalSteps, getMusicalPosition]);

  return (
    <div style={{ width: '100%', maxWidth: '100%', position: 'relative' }}>
      {/* Beat grid (replaces measure markers) */}
      <BeatGrid
        measures={measures}
        stepsPerMeasure={stepsPerMeasure}
        currentStep={currentStep}
      />

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
              {Array.from({ length: totalSteps }).map((_, stepIndex) => {
                const isActive = sequence[trackIndex][stepIndex];
                const isCurrentStep = stepIndex === currentStep;
                const isMeasureBoundary = stepIndex > 0 && stepIndex % stepsPerMeasure === 0;

                // Check if this cell has a hint
                const hint = highlightedCells.find(
                  (h) => h.track === trackIndex && h.step === stepIndex
                );
                const hasHint = Boolean(hint);
                const hintType = hint?.type; // 'add' or 'remove'

                // Determine border/outline styling
                let borderStyle;
                let outlineStyle;

                if (hasHint) {
                  // Hint styling takes precedence over current step
                  const hintColor = hintType === 'add' ? '#22c55e' : '#ef4444'; // green for add, red for remove
                  outlineStyle = `3px solid ${hintColor}`;
                } else if (isCurrentStep) {
                  outlineStyle = `2px solid ${theme.colors.highlight}`;
                } else {
                  outlineStyle = 'none';
                }

                borderStyle = isMeasureBoundary
                  ? `2px solid ${theme.colors.border.measure}`
                  : `1px solid ${theme.colors.border.dark}`;

                return (
                  <button
                    key={stepIndex}
                    onClick={() => handleCellClick(trackIndex, stepIndex)}
                    style={{
                      flex: 1,
                      minWidth: '20px',
                      height: '40px',
                      border: `1px solid ${theme.colors.border.dark}`,
                      borderLeft: borderStyle,
                      background: (isActive && !hideNotes) ? theme.colors.primary : theme.colors.bg.grid,
                      cursor: isEditable ? 'pointer' : 'default',
                      outline: outlineStyle,
                      outlineOffset: '-2px',
                      transition: 'background 0.1s',
                    }}
                    disabled={!isEditable}
                    title={`${track.label} - Step ${stepIndex + 1}${hasHint ? ` (${hintType === 'add' ? 'Add note here' : 'Remove this note'})` : ''}`}
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
  // Only re-render if sequence, currentStep, bpm, isEditable, hideNotes, highlightedCells, instruments, or pattern metadata changes
  // Playhead animation is handled internally via requestAnimationFrame
  return (
    prevProps.sequence === nextProps.sequence &&
    prevProps.currentStep === nextProps.currentStep &&
    prevProps.bpm === nextProps.bpm &&
    prevProps.isEditable === nextProps.isEditable &&
    prevProps.hideNotes === nextProps.hideNotes &&
    prevProps.highlightedCells === nextProps.highlightedCells &&
    prevProps.totalSteps === nextProps.totalSteps &&
    prevProps.stepsPerMeasure === nextProps.stepsPerMeasure &&
    prevProps.measures === nextProps.measures &&
    prevProps.getMusicalPosition === nextProps.getMusicalPosition &&
    prevProps.instruments === nextProps.instruments
  );
});
