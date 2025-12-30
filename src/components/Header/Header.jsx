import { theme } from '../../theme';
import { ConnectionStatus } from './ConnectionStatus';
import { BpmControl } from './BpmControl';
import { DifficultyBadge } from './DifficultyBadge';
import { useWarmupMode } from '../../hooks/useWarmupMode';

export function Header({ selectedOutput, bpm, onBpmChange, currentQuestionIndex, totalQuestions, currentPatternDifficulty, onExit }) {
  const { isWarmupMode } = useWarmupMode();

  return (
    <header
      style={{
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        background: theme.colors.bg.secondary,
        borderBottom: `1px solid ${theme.colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing.lg,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg, flexWrap: 'wrap' }}>
        <ConnectionStatus selectedOutput={selectedOutput} />
        <BpmControl bpm={bpm} onBpmChange={onBpmChange} />

        {/* Warmup Mode Indicator - only show when active */}
        {isWarmupMode && (
          <div style={{
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            background: theme.colors.warning,
            color: 'white',
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
          }}>
            <span>🔥</span>
            <span>WARMUP MODE</span>
          </div>
        )}

        {/* Difficulty Badge - show when pattern difficulty is available */}
        {currentPatternDifficulty && (
          <DifficultyBadge difficulty={currentPatternDifficulty} />
        )}
      </div>

      {currentQuestionIndex !== undefined && totalQuestions && (
        <div
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.primary,
            letterSpacing: '0.05em',
          }}
        >
          SESSION {currentQuestionIndex + 1} OF {totalQuestions}
        </div>
      )}

      {/* Exit button (optional) */}
      {onExit && (
        <button
          onClick={onExit}
          style={{
            padding: theme.buttons.size.padding,
            fontSize: theme.buttons.size.fontSize,
            fontWeight: theme.buttons.size.fontWeight,
            background: 'transparent',
            color: theme.colors.text.secondary,
            border: `1px solid ${theme.colors.border.default}`,
            borderRadius: theme.borderRadius.sm,
            cursor: 'pointer',
            transition: `all ${theme.transitions.base}`,
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = theme.colors.danger;
            e.target.style.color = theme.colors.danger;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.colors.border.default;
            e.target.style.color = theme.colors.text.secondary;
          }}
        >
          Exit Quiz
        </button>
      )}
    </header>
  );
}
