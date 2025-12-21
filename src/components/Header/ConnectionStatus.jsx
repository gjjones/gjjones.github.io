import { theme } from '../../theme';

export function ConnectionStatus({ selectedOutput }) {
  const getStatusColor = () => {
    if (selectedOutput && selectedOutput.state === 'connected') {
      return theme.colors.success;
    }
    return theme.colors.text.secondary;
  };

  const getStatusText = () => {
    if (selectedOutput && selectedOutput.state === 'connected') {
      return 'Connected';
    }
    return 'Disconnected';
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
      <span
        style={{
          width: theme.other.statusIndicatorSize,
          height: theme.other.statusIndicatorSize,
          borderRadius: '50%',
          background: getStatusColor(),
          display: 'inline-block',
        }}
      />
      <span style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
        {getStatusText()}
      </span>
    </div>
  );
}
