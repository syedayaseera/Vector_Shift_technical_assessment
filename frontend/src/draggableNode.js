// draggableNode.js
export const DraggableNode = ({ type, label, icon, color = '#6366f1' }) => {
  const onDragStart = (event, nodeType) => {
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      style={{
        cursor: 'grab',
        minWidth: '72px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '3px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderLeft: `3px solid ${color}`,
        transition: 'all 0.15s ease',
        userSelect: 'none',
        padding: '0 10px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon && <span style={{ fontSize: '14px', lineHeight: 1 }}>{icon}</span>}
      <span style={{ color: '#e2e8f0', fontSize: '11px', fontWeight: 500, letterSpacing: '0.02em' }}>
        {label}
      </span>
    </div>
  );
};