import { calculateWordSum } from '../lib/mapping.js';
import assert from 'assert';

// Test: the word عبدالسلام should reduce to a single-digit sum of 8 (per user request).
const word = 'عبدالسلام';
const expected = 8;
const actual = calculateWordSum(word);

console.log(`Testing word: ${word} -> sum (single-digit): ${actual}`);
try {
  assert.strictEqual(actual, expected, `Expected ${expected} but got ${actual}`);
  console.log('Test passed: عبدالسلام reduces to', expected);
  process.exit(0);
} catch (e) {
  console.error('Test failed:', e.message);
  process.exit(1);
}


