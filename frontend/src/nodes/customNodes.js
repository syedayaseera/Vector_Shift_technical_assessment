// nodes/customNodes.js
// 5 new nodes demonstrating BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

/* ── 1. API Request Node ── */
export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      accentColor="#38bdf8"
      inputs={[{ id: 'body', label: 'Body' }]}
      outputs={[
        { id: 'response', label: 'Response', style: { top: '35%' } },
        { id: 'error', label: 'Error', style: { top: '65%' } },
      ]}
    >
      <NodeField label="Method">
        <NodeSelect value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </NodeSelect>
      </NodeField>
      <NodeField label="URL">
        <NodeInput
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </NodeField>
    </BaseNode>
  );
};

/* ── 2. Conditional / If-Else Node ── */
export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      accentColor="#fb923c"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'true', label: 'True', style: { top: '35%' } },
        { id: 'false', label: 'False', style: { top: '65%' } },
      ]}
    >
      <NodeField label="Condition">
        <NodeInput
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
        />
      </NodeField>
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
        {['True', 'False'].map((label) => (
          <span
            key={label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '3px',
              borderRadius: '4px',
              fontSize: '10px',
              background: label === 'True' ? 'rgba(52,211,153,0.12)' : 'rgba(251,146,60,0.12)',
              color: label === 'True' ? '#34d399' : '#fb923c',
              border: `1px solid ${label === 'True' ? 'rgba(52,211,153,0.25)' : 'rgba(251,146,60,0.25)'}`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </BaseNode>
  );
};

/* ── 3. Note / Comment Node ── */
export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="💬"
      accentColor="#fbbf24"
      minWidth={200}
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          background: 'rgba(251,191,36,0.06)',
          border: '1px solid rgba(251,191,36,0.2)',
          borderRadius: '6px',
          padding: '6px 8px',
          color: '#fde68a',
          fontSize: '12px',
          outline: 'none',
          boxSizing: 'border-box',
          resize: 'none',
          fontFamily: 'inherit',
          lineHeight: '1.5',
        }}
      />
    </BaseNode>
  );
};

/* ── 4. Data Transform Node ── */
export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'JSON Parse');

  const transforms = [
    'JSON Parse', 'JSON Stringify', 'To Uppercase', 'To Lowercase',
    'Trim Whitespace', 'Base64 Encode', 'Base64 Decode',
  ];

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      accentColor="#c084fc"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <NodeField label="Operation">
        <NodeSelect value={transformType} onChange={(e) => setTransformType(e.target.value)}>
          {transforms.map((t) => <option key={t}>{t}</option>)}
        </NodeSelect>
      </NodeField>
      <div style={{
        marginTop: '6px',
        padding: '5px 8px',
        background: 'rgba(192,132,252,0.08)',
        borderRadius: '5px',
        fontSize: '10px',
        color: 'rgba(192,132,252,0.7)',
      }}>
        Applies <strong style={{ color: '#c084fc' }}>{transformType}</strong> to input data
      </div>
    </BaseNode>
  );
};

/* ── 5. Timer / Delay Node ── */
export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      accentColor="#f472b6"
      inputs={[{ id: 'trigger', label: 'Trigger' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <NodeField label="Delay">
        <div style={{ display: 'flex', gap: '6px' }}>
          <NodeInput
            type="number"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            style={{ flex: 1 }}
            min={0}
          />
          <NodeSelect
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{ width: '60px' }}
          >
            <option value="ms">ms</option>
            <option value="s">s</option>
            <option value="m">min</option>
          </NodeSelect>
        </div>
      </NodeField>
      <div style={{
        marginTop: '4px',
        fontSize: '10px',
        color: 'rgba(244,114,182,0.6)',
        textAlign: 'center',
      }}>
        Waits {delay} {unit} before passing data
      </div>
    </BaseNode>
  );
};