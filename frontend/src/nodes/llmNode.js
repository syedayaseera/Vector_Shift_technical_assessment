// nodes/llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      accentColor="#a78bfa"
      inputs={[
        { id: 'system', label: 'System', style: { top: '33%' } },
        { id: 'prompt', label: 'Prompt', style: { top: '66%' } },
      ]}
      outputs={[{ id: 'response', label: '' }]}
    >
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', padding: '4px 0' }}>
        Language Model
      </div>
      <div style={{
        marginTop: '6px',
        padding: '6px 8px',
        background: 'rgba(167,139,250,0.08)',
        borderRadius: '6px',
        fontSize: '11px',
        color: 'rgba(167,139,250,0.8)',
      }}>
        Connects system prompt + user prompt → response
      </div>
    </BaseNode>
  );
};