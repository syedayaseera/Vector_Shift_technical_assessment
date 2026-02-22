// nodes/textNode.js
// Part 3: Auto-resizing + dynamic variable handles from {{ varName }} syntax

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, NodeField } from './BaseNode';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  const seen = new Set();
  let match;
  VAR_REGEX.lastIndex = 0;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [size, setSize] = useState({ width: 220, height: 'auto' });
  const textareaRef = useRef(null);
  const accentColor = '#f59e0b';

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Auto-resize based on textarea scroll height
  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      const scrollH = el.scrollHeight;
      el.style.height = scrollH + 'px';

      // Widen node if text is long on a line
      const lines = currText.split('\n');
      const maxLen = Math.max(...lines.map((l) => l.length), 0);
      const newWidth = Math.max(220, Math.min(500, 120 + maxLen * 7.5));
      setSize({ width: newWidth });
    }
  }, [currText]);

  const handleChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={{ position: 'relative', width: size.width }}>
      {/* Dynamic variable handles on the LEFT */}
      {variables.map((varName, i) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-var-${varName}`}
            style={{
              width: '10px',
              height: '10px',
              background: accentColor,
              border: '2px solid #16192a',
              top: `${((i + 1) / (variables.length + 1)) * 100}%`,
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '14px',
              top: `${((i + 1) / (variables.length + 1)) * 100}%`,
              transform: 'translateY(-50%)',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.4)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }}
          >
            {varName}
          </span>
        </div>
      ))}

      <BaseNode
        id={id}
        title="Text"
        icon="📝"
        accentColor={accentColor}
        outputs={[{ id: 'output', label: '' }]}
        style={{ width: '100%' }}
      >
        <NodeField label="Content">
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleChange}
            rows={1}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              padding: '6px 8px',
              color: '#e2e8f0',
              fontSize: '12px',
              outline: 'none',
              boxSizing: 'border-box',
              resize: 'none',
              fontFamily: 'inherit',
              lineHeight: '1.5',
              overflow: 'hidden',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(245,158,11,0.6)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </NodeField>

        {variables.length > 0 && (
          <div style={{ marginTop: '4px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>
              Variables detected:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {variables.map((v) => (
                <span
                  key={v}
                  style={{
                    padding: '2px 7px',
                    background: 'rgba(245,158,11,0.15)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: '#f59e0b',
                  }}
                >
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </BaseNode>
    </div>
  );
};