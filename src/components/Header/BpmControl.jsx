import { theme } from '../../theme';

export function BpmControl({ bpm, onBpmChange }) {
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 40 && value <= 240) {
      onBpmChange(value);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginLeft: 'auto' }}>
      <label htmlFor="bpm-input" style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
        BPM:
      </label>
      <input
        id="bpm-input"
        type="number"
        min="40"
        max="240"
        value={bpm}
        onChange={handleChange}
        style={{
          width: '70px',
          padding: theme.spacing.sm,
          fontSize: theme.typography.fontSize.sm,
          border: `1px solid ${theme.colors.border.medium}`,
          borderRadius: theme.borderRadius.sm,
        }}
      />
    </div>
  );
}
