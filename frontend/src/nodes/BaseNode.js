import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = '#6366f1',
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  minHeight,
  style = {},
}) => {
  return (
    <div
      style={{
        minWidth,
        minHeight: minHeight || 'auto',
        background: 'linear-gradient(135deg, #1e2433 0%, #16192a 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: '12px',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: '#e2e8f0',
        overflow: 'visible',
        position: 'relative',
        transition: 'box-shadow 0.2s ease',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px 8px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: `linear-gradient(90deg, ${accentColor}18 0%, transparent 100%)`,
          borderRadius: '10px 10px 0 0',
        }}
      >
        {icon && (
          <span style={{ fontSize: '15px', lineHeight: 1 }}>{icon}</span>
        )}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: accentColor,
          }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>{children}</div>

      {/* Input Handles (left) */}
      {inputs.map((handle, i) => (
        <div key={handle.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{
              width: '10px',
              height: '10px',
              background: accentColor,
              border: '2px solid #16192a',
              top: handle.style?.top || `${((i + 1) / (inputs.length + 1)) * 100}%`,
              ...handle.style,
            }}
          />
          {handle.label && (
            <span
              style={{
                position: 'absolute',
                left: '14px',
                top: handle.style?.top || `${((i + 1) / (inputs.length + 1)) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}

      {/* Output Handles (right) */}
      {outputs.map((handle, i) => (
        <div key={handle.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={{
              width: '10px',
              height: '10px',
              background: accentColor,
              border: '2px solid #16192a',
              top: handle.style?.top || `${((i + 1) / (outputs.length + 1)) * 100}%`,
              ...handle.style,
            }}
          />
          {handle.label && (
            <span
              style={{
                position: 'absolute',
                right: '14px',
                top: handle.style?.top || `${((i + 1) / (outputs.length + 1)) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Shared styled sub-components ── */

export const NodeLabel = ({ children }) => (
  <label
    style={{
      display: 'block',
      fontSize: '11px',
      color: 'rgba(255,255,255,0.45)',
      marginBottom: '4px',
      letterSpacing: '0.04em',
    }}
  >
    {children}
  </label>
);

export const NodeInput = ({ style, ...props }) => (
  <input
    {...props}
    style={{
      width: '100%',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px',
      padding: '5px 8px',
      color: '#e2e8f0',
      fontSize: '12px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.15s',
      ...style,
    }}
    onFocus={(e) => {
      e.target.style.borderColor = 'rgba(99,102,241,0.6)';
      if (props.onFocus) props.onFocus(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'rgba(255,255,255,0.1)';
      if (props.onBlur) props.onBlur(e);
    }}
  />
);

export const NodeSelect = ({ style, children, ...props }) => (
  <select
    {...props}
    style={{
      width: '100%',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px',
      padding: '5px 8px',
      color: '#e2e8f0',
      fontSize: '12px',
      outline: 'none',
      boxSizing: 'border-box',
      cursor: 'pointer',
      ...style,
    }}
  >
    {children}
  </select>
);

export const NodeTextArea = ({ style, ...props }) => (
  <textarea
    {...props}
    style={{
      width: '100%',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px',
      padding: '5px 8px',
      color: '#e2e8f0',
      fontSize: '12px',
      outline: 'none',
      boxSizing: 'border-box',
      resize: 'none',
      fontFamily: 'inherit',
      lineHeight: '1.5',
      transition: 'border-color 0.15s',
      ...style,
    }}
    onFocus={(e) => {
      e.target.style.borderColor = 'rgba(99,102,241,0.6)';
      if (props.onFocus) props.onFocus(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'rgba(255,255,255,0.1)';
      if (props.onBlur) props.onBlur(e);
    }}
  />
);

export const NodeField = ({ label, children }) => (
  <div style={{ marginBottom: '10px' }}>
    {label && <NodeLabel>{label}</NodeLabel>}
    {children}
  </div>
);