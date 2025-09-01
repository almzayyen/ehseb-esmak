// Expose mapping dictionary for client-side UI as well as server-side logic.
export const letterValues = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ى': 1, // variants map to 1
  // Primary letters
  'ل': 2, 'ن': 3, 'م': 4, 'و': 5, 'ي': 6, 'ه': 7,'ة': 7, 'ر': 8, 'ب': 9, 'ك': 10, 'ت': 11, 'ع': 12, 'ف': 13, 'ق': 14, 'س': 15, 'د': 16, 'ذ': 17, 'ح': 18, 'ج': 19, 'خ': 20, 'ش': 21, 'ص': 22, 'ض': 23, 'ز': 24, 'ث': 25, 'ط': 26, 'غ': 27, 'ظ': 28, 'ء': 29, 'ئ': 29
};

export const orderedLetterPairs = Object.entries(letterValues)
  .filter(([k]) => k.length === 1)
  .sort((a, b) => a[1] - b[1]);

export function calculateWordSum(word) {
  let sum = 0;
  for (const ch of word) {
    // accumulate using explicit mapping; if not found, fall back to 0:
    sum += letterValues[ch] ?? 0;
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


