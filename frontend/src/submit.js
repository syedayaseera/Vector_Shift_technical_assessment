// submit.js
import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Result Modal */}
      {result && (
        <div
          onClick={() => setResult(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1e2433 0%, #16192a 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', padding: '28px 32px', minWidth: '320px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: '#e2e8f0',
            }}
          >
            {result.error ? (
              <>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f87171', marginBottom: '8px' }}>Error</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{result.error}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                  {result.is_dag ? '✅' : '⚠️'}
                </div>
                <div style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px', color: '#e2e8f0' }}>
                  Pipeline Analysis
                </div>
                {[
                  { label: 'Nodes', value: result.num_nodes, color: '#22d3ee', icon: '◉' },
                  { label: 'Edges', value: result.num_edges, color: '#a78bfa', icon: '⟶' },
                  {
                    label: 'Valid DAG',
                    value: result.is_dag ? 'Yes' : 'No',
                    color: result.is_dag ? '#34d399' : '#f87171',
                    icon: result.is_dag ? '✓' : '✗',
                  },
                ].map(({ label, value, color, icon }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', marginBottom: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '8px', borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color }}>{icon} {value}</span>
                  </div>
                ))}
                {!result.is_dag && (
                  <div style={{
                    marginTop: '12px', padding: '8px 12px',
                    background: 'rgba(248,113,113,0.08)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    borderRadius: '6px', fontSize: '12px', color: '#f87171',
                  }}>
                    Pipeline contains cycles — not a valid DAG.
                  </div>
                )}
              </>
            )}
            <button
              onClick={() => setResult(null)}
              style={{
                marginTop: '20px', width: '100%', padding: '10px',
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.4)',
                borderRadius: '8px', color: '#818cf8',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.15)')}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Submit Bar */}
      <div style={{
        height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, #13161f 0%, #0f1117 100%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '10px 32px',
            background: loading
              ? 'rgba(99,102,241,0.3)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none', borderRadius: '8px', color: '#fff',
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {loading ? '⏳ Analyzing...' : '🚀 Submit Pipeline'}
        </button>
      </div>
    </>
  );
};