// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  const nodes = [
    { type: 'customInput', label: 'Input', icon: '⬆️', color: '#22d3ee' },
    { type: 'llm', label: 'LLM', icon: '🤖', color: '#a78bfa' },
    { type: 'customOutput', label: 'Output', icon: '⬇️', color: '#34d399' },
    { type: 'text', label: 'Text', icon: '📝', color: '#f59e0b' },
    { type: 'api', label: 'API', icon: '🌐', color: '#38bdf8' },
    { type: 'condition', label: 'Condition', icon: '🔀', color: '#fb923c' },
    { type: 'note', label: 'Note', icon: '💬', color: '#fbbf24' },
    { type: 'transform', label: 'Transform', icon: '⚙️', color: '#c084fc' },
    { type: 'timer', label: 'Timer', icon: '⏱️', color: '#f472b6' },
  ];

  return (
    <div
      style={{
        padding: '10px 16px',
        background: 'linear-gradient(180deg, #0f1117 0%, #13161f 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Logo / Title */}
      <div style={{ marginRight: '8px', flexShrink: 0 }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: '15px',
          color: '#e2e8f0',
          letterSpacing: '-0.02em',
        }}>
          Vector<span style={{ color: '#6366f1' }}>Shift</span>
        </span>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.08)' }} />

      {/* Node palette */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
        {nodes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
            color={node.color}
          />
        ))}
      </div>
    </div>
  );
};