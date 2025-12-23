import { theme } from '../../theme';
import { ConnectionStatus } from './ConnectionStatus';
import { BpmControl } from './BpmControl';

export function Header({ selectedOutput, bpm, onBpmChange, currentQuestionIndex, totalQuestions, onExit }) {
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
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            background: 'transparent',
            color: theme.colors.text.secondary,
            border: `1px solid ${theme.colors.border.default}`,
            borderRadius: theme.borderRadius.sm,
            cursor: 'pointer',
            transition: 'all 0.2s',
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
