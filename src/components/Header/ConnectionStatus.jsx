import { theme } from '../../theme';

export function ConnectionStatus({ selectedOutput }) {
  const isConnected = selectedOutput && selectedOutput.state === 'connected';
  const deviceName = isConnected
    ? (selectedOutput.name || selectedOutput.id || 'Unknown Device')
    : 'No device';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
      {/* Status dot - green filled circle if connected, gray outline circle if not */}
      <span style={{ color: isConnected ? '#22c55e' : '#9ca3af', fontSize: theme.typography.fontSize.base }}>
        {isConnected ? '●' : '○'}
      </span>
      {/* Device name or "No device" */}
      <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
        {deviceName}
      </span>
    </div>
  );
}
