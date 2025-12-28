import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { theme } from '../../../theme.js';
import { chartColors, defaultAxisStyle, defaultTooltipStyle } from './chartConfig.js';

/**
 * Quality Trend Chart Component
 *
 * Displays line chart showing quality accuracy progression over time
 * Shows all qualities on one chart with different colored lines
 *
 * @param {Object} qualityHistory - Quality history data from progress.qualityHistory
 */
export function QualityTrendChart({ qualityHistory }) {
  // Empty state
  if (!qualityHistory || Object.keys(qualityHistory).length === 0) {
    return (
      <div
        style={{
          padding: theme.spacing.lg,
          background: theme.colors.bg.secondary,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border.default}`,
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.semibold,
            marginBottom: theme.spacing.sm,
            color: theme.colors.text.primary,
          }}
        >
          Quality Progress Over Time
        </h3>
        <p style={{ color: theme.colors.text.secondary }}>
          Not enough historical data yet. Practice more lessons to see trends!
        </p>
      </div>
    );
  }

  // Transform quality history into chart data format
  const chartData = transformHistoryForChart(qualityHistory);

  // Check if we have enough data
  if (chartData.length < 2) {
    return (
      <div
        style={{
          padding: theme.spacing.lg,
          background: theme.colors.bg.secondary,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border.default}`,
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.semibold,
            marginBottom: theme.spacing.sm,
            color: theme.colors.text.primary,
          }}
        >
          Quality Progress Over Time
        </h3>
        <p style={{ color: theme.colors.text.secondary }}>
          Practice more to build trend history (need at least 2 sessions)
        </p>
      </div>
    );
  }

  // Get all qualities for line rendering
  const qualities = Object.keys(qualityHistory);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={defaultTooltipStyle}>
          <p
            style={{
              margin: 0,
              marginBottom: theme.spacing.xs,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                margin: 0,
                color: entry.color,
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              {formatQualityName(entry.dataKey)}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        padding: theme.spacing.lg,
        background: theme.colors.bg.secondary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border.default}`,
      }}
    >
      <h3
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          marginBottom: theme.spacing.md,
          color: theme.colors.text.primary,
        }}
      >
        Quality Progress Over Time
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis
            dataKey="date"
            style={defaultAxisStyle}
            tick={{ fontSize: theme.typography.fontSize.xs }}
          />
          <YAxis
            domain={[0, 100]}
            label={{
              value: 'Accuracy (%)',
              angle: -90,
              position: 'insideLeft',
              style: { fill: theme.colors.text.secondary },
            }}
            style={defaultAxisStyle}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: theme.spacing.md,
              fontSize: theme.typography.fontSize.sm,
            }}
          />
          {qualities.map((quality, index) => (
            <Line
              key={quality}
              type="monotone"
              dataKey={quality}
              stroke={getQualityColor(index)}
              strokeWidth={2}
              dot={{ r: 3 }}
              name={formatQualityName(quality)}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Transform quality history into Recharts format
 * Merges all quality histories into daily snapshots
 * @param {Object} qualityHistory - Quality history object
 * @returns {Array} Array of {date, quality1, quality2, ...} objects
 */
function transformHistoryForChart(qualityHistory) {
  // Collect all timestamps across all qualities
  const allTimestamps = new Set();

  Object.values(qualityHistory).forEach(snapshots => {
    snapshots.forEach(snapshot => {
      // Format date as YYYY-MM-DD
      const date = new Date(snapshot.timestamp).toISOString().split('T')[0];
      allTimestamps.add(date);
    });
  });

  // Sort timestamps
  const sortedDates = Array.from(allTimestamps).sort();

  // Build chart data
  const chartData = sortedDates.map(date => {
    const dataPoint = { date };

    // For each quality, find the most recent snapshot on or before this date
    Object.entries(qualityHistory).forEach(([quality, snapshots]) => {
      // Find the most recent snapshot for this date
      const relevantSnapshots = snapshots.filter(s => {
        const snapshotDate = new Date(s.timestamp).toISOString().split('T')[0];
        return snapshotDate <= date;
      });

      if (relevantSnapshots.length > 0) {
        // Get the most recent snapshot
        const latestSnapshot = relevantSnapshots[relevantSnapshots.length - 1];
        dataPoint[quality] = Math.round(latestSnapshot.accuracy * 100);
      }
    });

    return dataPoint;
  });

  return chartData;
}

/**
 * Format quality name for display
 * @param {string} quality - Quality identifier (e.g., "downbeat-identification")
 * @returns {string} Formatted name (e.g., "Downbeat Identification")
 */
function formatQualityName(quality) {
  return quality
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get color for quality line
 * Uses a color palette that cycles through distinct colors
 * @param {number} index - Quality index
 * @returns {string} Color hex code
 */
function getQualityColor(index) {
  const colors = [
    theme.colors.primary,       // Blue
    theme.colors.success,       // Green
    theme.colors.warning,       // Orange
    theme.colors.danger,        // Red
    '#8b5cf6',                  // Purple
    '#06b6d4',                  // Cyan
    '#f59e0b',                  // Amber
    '#10b981',                  // Emerald
    '#ef4444',                  // Rose
  ];

  return colors[index % colors.length];
}
