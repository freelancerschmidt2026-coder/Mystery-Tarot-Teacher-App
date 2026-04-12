import React from 'react';
import { useVisualEffectsState } from '../../state/VisualEffectsState';

export const VisualEffectsToggle: React.FC = () => {
  const { visualEffectsEnabled, toggleVisualEffects } = useVisualEffectsState();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{ fontWeight: 'bold' }}>Visual Effects:</label>
      <button
        onClick={toggleVisualEffects}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #888',
          background: visualEffectsEnabled ? '#4caf50' : '#ccc',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        {visualEffectsEnabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};
