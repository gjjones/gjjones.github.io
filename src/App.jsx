import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1>Welcome to gjjones.github.io</h1>
      <p>This is a React 19 application built with rspack.</p>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#f0f0f0'
          }}
        >
          Count: {count}
        </button>
      </div>

      <p style={{ marginTop: '2rem', color: '#666' }}>
        Edit <code>src/App.jsx</code> to customize this page.
      </p>
    </div>
  );
}

export default App;
