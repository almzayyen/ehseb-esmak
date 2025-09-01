// This module exposes a mapping function compatible with the 29-entry mapping from your image.
// For now, we implement a simple fixed mapping matching the 29 entries.
const explicit = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ى': 1, // variants map to 1
  'اللام': 2, // not used in sums directly, kept for reference
  // Primary letters
  'ل': 2, 'ن': 3, 'م': 4, 'و': 5, 'ي': 6, 'ه': 7, 'ر': 8, 'ب': 9, 'ك': 10, 'ت': 11, 'ع': 12, 'ف': 13, 'ق': 14, 'س': 15, 'د': 16, 'ذ': 17, 'ح': 18, 'ج': 19, 'خ': 20, 'ش': 21, 'ص': 22, 'ض': 23, 'ز': 24, 'ث': 25, 'ط': 26, 'غ': 27, 'ظ': 28, '': 29, 'ئ': 29
};

export function calculateWordSum(word) {
  let sum = 0;
  for (const ch of word) {
    // accumulate using explicit mapping; if not found, fall back to digit sum style:
    sum += explicit[ch] ?? 0;
  }
  // Reduce to a single digit by repeatedly summing digits until one digit remains
  while (sum >= 10) {
    let next = 0;
    while (sum > 0) {
      next += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = next;
  }
  return sum;
}


