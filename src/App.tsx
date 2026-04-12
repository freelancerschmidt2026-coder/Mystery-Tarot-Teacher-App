import React from 'react';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#050510',
        color: '#f5f5ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Mystery Tarot Teacher
      </h1>
      <p style={{ marginTop: '1rem', opacity: 0.8 }}>
        Luna’s realm is online. The deeper architecture is under construction.
      </p>
    </div>
  );
}

export default App;

