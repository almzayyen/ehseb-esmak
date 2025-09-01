import React, { useState } from 'react';
import { calculateWordSum, letterValues, orderedLetterPairs } from '../lib/mapping.js';

export default function Home() {
  const [word, setWord] = useState('');
  const [sum, setSum] = useState(null);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('ar');

  // Compute sum locally for a fast, Arabic-first UI
  function computeSum() {
    setError(null);
    const s = calculateWordSum(word);
    if (typeof s === 'number') {
      setSum(s);
    } else {
      setSum(null);
    }
  }

  // Texts based on language
  const header = lang === 'ar' ? 'حاسبة مجموع الحروف العربية' : 'Arabic Letter Sum Calculator';
  const placeholder = lang === 'ar' ? 'أدخل كلمة عربية' : 'Enter Arabic word';
  const buttonText = lang === 'ar' ? 'احسب المجموع' : 'Compute Sum';
  const sumLabel = lang === 'ar' ? 'المجموع:' : 'Sum:'; 
  const mappingHeader = lang === 'ar' ? 'المطابقة: قيم الحروف العربية' : 'Mapping: Arabic letter values';
  const toggleLabel = lang === 'ar' ? 'English' : 'العربية';

  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #fffaf0 60%)',
      minHeight: '100vh'
    },
    header: {
      fontSize: '2rem',
      color: '#1b5e20',
      marginBottom: '1rem'
    },
    layout: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'start'
    },
    left: { flex: 1 },
    right: { flex: 1, minWidth: '320px' },
    input: { width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' },
    button: { padding: '0.6rem 1rem', borderRadius: '6px', border: '0', background: '#d4af37', color: '#1b5e20', fontWeight: 'bold', cursor: 'pointer' },
    sum: { marginTop: '1rem', fontWeight: 'bold' },
    error: { color: 'red' },
    mappingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' },
    mapItem: { padding: '6px 8px', borderRadius: '4px', background: '#f7f7f7', border: '1px solid #eee', textAlign: 'center', fontSize: '0.95rem' }
  };

  // Use ordered letters sorted by numeric value
  const mappingEntries = orderedLetterPairs; // [char, value] pairs

  return (
    <div style={styles.container}>
      <div style={{ position: 'fixed', top: 12, right: 12 }}>
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' }}>
          {toggleLabel}
        </button>
      </div>
      <h1 style={styles.header}>{header}</h1>
      <div style={styles.layout}>
        <div style={styles.left}>
          <div style={{ marginBottom: '0.75rem', color: '#2e7d32', fontWeight: 'bold' }}>
            {lang === 'ar' ? ' الرجاء إدخال كلمة عربية للحساب' : 'Enter an Arabic word to compute its sum'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input value={word} onChange={(e) => setWord(e.target.value)} placeholder={placeholder} onKeyDown={(e) => { if (e.key === 'Enter') computeSum(); }} style={styles.input} />
            <button onClick={computeSum} style={styles.button}>{buttonText}</button>
            {typeof sum === 'number' && (
              <div style={styles.sum}>{sumLabel} {sum}</div>
            )}
            {error && (
              <div style={styles.error}>{error}</div>
            )}
          </div>
        </div>
        <div style={styles.right}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{mappingHeader}</div>
          <div style={styles.mappingGrid}>
            {mappingEntries.map(([ch, val]) => (
              <div key={ch} style={styles.mapItem}>{ch} → {val}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


