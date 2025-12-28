import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { theme } from '../../../theme.js';
import { chartColors, defaultAxisStyle, defaultTooltipStyle } from './chartConfig.js';

/**
 * Quality Mastery Bar Chart Component
 *
 * Displays a bar chart comparing mastery levels across all skills/qualities
 * with color-coded bars based on mastery level (mastered/developing/needs-practice)
 *
 * @param {Array} data - Quality progress data from getQualityProgress()
 */
export function QualityMasteryChart({ data }) {
  // Empty state
  if (!data || data.length === 0) {
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
          Skill Mastery Levels
        </h3>
        <p style={{ color: theme.colors.text.secondary }}>
          No quality data available
        </p>
      </div>
    );
  }

  // Format quality names for display (e.g., "downbeat-identification" → "Downbeat Identification")
  const formatQuality = (quality) => {
    return quality
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get bar color based on accuracy level
  const getBarColor = (accuracy) => {
    if (accuracy >= 90) return chartColors.mastered;
    if (accuracy >= 70) return chartColors.developing;
    return chartColors.needsPractice;
  };

  // Custom tooltip to show detailed information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={defaultTooltipStyle}>
          <p
            style={{
              margin: 0,
              marginBottom: theme.spacing.xs,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            {formatQuality(data.quality)}
          </p>
          <p style={{ margin: 0, color: getBarColor(data.accuracy) }}>
            {data.accuracy}% - {data.masteryLevel.label}
          </p>
          <p
            style={{
              margin: 0,
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.secondary,
            }}
          >
            {data.lessonCount} {data.lessonCount === 1 ? 'lesson' : 'lessons'}
          </p>
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
        Skill Mastery Levels
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <XAxis
            dataKey="quality"
            tickFormatter={formatQuality}
            angle={-45}
            textAnchor="end"
            height={80}
            style={defaultAxisStyle}
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
          <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: theme.spacing.lg,
          marginTop: theme.spacing.md,
          flexWrap: 'wrap',
        }}
      >
        <LegendItem color={chartColors.mastered} label="Mastered (90%+)" />
        <LegendItem color={chartColors.developing} label="Developing (70-89%)" />
        <LegendItem color={chartColors.needsPractice} label="Needs Practice (<70%)" />
      </div>
    </div>
  );
}

/**
 * Legend Item Component
 */
function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          background: color,
          borderRadius: '2px',
        }}
      />
      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        {label}
      </span>
    </div>
  );
}
