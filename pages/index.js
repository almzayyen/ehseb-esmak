import React, { useState } from 'react';

export default function Home() {
  const [word, setWord] = useState('');
  const [sum, setSum] = useState(null);
  const [error, setError] = useState(null);

  async function computeSum() {
    setError(null);
    setSum(null);
    try {
      const res = await fetch(`/api/sum?word=${encodeURIComponent(word)}`);
      if (!res.ok) {
        setError('Failed to compute sum');
        return;
      }
      const data = await res.json();
      if (typeof data.sum === 'number') {
        setSum(data.sum);
      } else {
        setSum(null);
      }
    } catch (e) {
      setError('Network error');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Word Sum Calculator</h1>
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter Arabic word"
        style={{ width: '300px', padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={computeSum} style={{ marginLeft: '1rem', padding: '0.6rem 1rem' }}>
        Compute Sum
      </button>
      {typeof sum === 'number' && (
        <div style={{ marginTop: '1rem' }}>
          Sum: <strong>{sum}</strong>
        </div>
      )}
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
      )}
    </div>
  );
}


