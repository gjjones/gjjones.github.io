import { useRef, useEffect, memo } from 'react';
import { theme } from '../theme';
import { BeatGrid } from './BeatGrid';
import { useResponsiveGrid, useTouchCellStyles } from '../hooks/useResponsiveGrid';

function SequencerGridComponent({ sequence, onToggleStep, currentStep, bpm, isEditable, hideNotes, highlightedCells = [], totalSteps, stepsPerMeasure, measures, getMusicalPosition, instruments, lessonConstraints = null }) {
  const tracks = instruments;
  const prevStepRef = useRef(currentStep);
  const playheadRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Responsive grid sizing
  const { cellSize, isTouch, isMobile } = useResponsiveGrid(totalSteps);
  const touchCellStyles = useTouchCellStyles(isTouch);

  // Helper function to check if a cell is locked
  const isCellLocked = (trackIndex, stepIndex) => {
    if (!lessonConstraints || !lessonConstraints.locked) return false;

    const track = tracks[trackIndex];
    const lockedSteps = lessonConstraints.locked[track.label];

    return lockedSteps && lockedSteps.includes(stepIndex);
  };

  const handleCellClick = (trackIndex, stepIndex) => {
    // Don't allow toggling locked cells
    if (isCellLocked(trackIndex, stepIndex)) {
      return;
    }

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
                const isLocked = isCellLocked(trackIndex, stepIndex);

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
                  const hintColor = hintType === 'add' ? theme.colors.success : theme.colors.danger;
                  outlineStyle = `3px solid ${hintColor}`;
                } else if (isCurrentStep) {
                  outlineStyle = `2px solid ${theme.colors.highlight}`;
                } else {
                  outlineStyle = 'none';
                }

                borderStyle = isMeasureBoundary
                  ? `2px solid ${theme.colors.border.measure}`
                  : `1px solid ${theme.colors.border.dark}`;

                // Determine background color
                let backgroundColor;
                if (isLocked) {
                  // Locked cells: use a distinct color (amber/orange for locked notes)
                  backgroundColor = isActive ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)';
                } else {
                  backgroundColor = (isActive && !hideNotes) ? theme.colors.primary : theme.colors.bg.grid;
                }

                return (
                  <button
                    key={stepIndex}
                    onClick={() => handleCellClick(trackIndex, stepIndex)}
                    style={{
                      flex: 1,
                      minWidth: touchCellStyles.minWidth,
                      height: touchCellStyles.minHeight,
                      border: `1px solid ${theme.colors.border.dark}`,
                      borderLeft: borderStyle,
                      background: backgroundColor,
                      cursor: isLocked ? 'not-allowed' : (isEditable ? touchCellStyles.cursor : 'default'),
                      outline: outlineStyle,
                      outlineOffset: '-2px',
                      transition: `background ${theme.transitions.fast}`,
                      opacity: isLocked ? 0.9 : 1,
                      position: 'relative',
                      touchAction: touchCellStyles.touchAction,
                    }}
                    disabled={!isEditable || isLocked}
                    title={`${track.label} - Step ${stepIndex + 1}${isLocked ? ' (Locked)' : ''}${hasHint ? ` (${hintType === 'add' ? 'Add note here' : 'Remove this note'})` : ''}`}
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
  // Only re-render if sequence, currentStep, bpm, isEditable, hideNotes, highlightedCells, instruments, pattern metadata, or constraints changes
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
    prevProps.instruments === nextProps.instruments &&
    prevProps.lessonConstraints === nextProps.lessonConstraints
  );
});
