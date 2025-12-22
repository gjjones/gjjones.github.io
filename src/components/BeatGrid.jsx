import { theme } from '../theme';

export function BeatGrid({
  measures,
  stepsPerMeasure,
  currentStep,
}) {
  const beatsPerMeasure = 4;
  const totalBeats = measures * beatsPerMeasure;
  const stepsPerBeat = stepsPerMeasure / beatsPerMeasure;

  // Calculate which beat is currently active
  const activeBeat = currentStep >= 0 ? Math.floor(currentStep / stepsPerBeat) : -1;

  return (
    <div style={{
      display: 'flex',
      paddingLeft: '60px', // Match track label offset
      marginBottom: theme.spacing.xs,
    }}>
      {Array.from({ length: totalBeats }, (_, beatIndex) => {
        const isActive = beatIndex === activeBeat;
        const measureNumber = Math.floor(beatIndex / beatsPerMeasure) + 1;
        const beatInMeasure = (beatIndex % beatsPerMeasure) + 1;
        const isMeasureStart = beatInMeasure === 1;

        return (
          <div
            key={beatIndex}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '32px',
              fontSize: theme.typography.fontSize.xs,
              color: isActive ? theme.colors.text.primary : theme.colors.text.secondary,
              background: isActive ? theme.colors.highlight : 'transparent',
              borderLeft: isMeasureStart ? `2px solid ${theme.colors.border.measure}` : `1px solid ${theme.colors.border.dark}`,
              transition: 'background 0.1s, color 0.1s',
            }}
          >
            {isMeasureStart ? measureNumber : ''}
          </div>
        );
      })}
    </div>
  );
}
