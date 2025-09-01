import { calculateWordSum } from '../../lib/mapping';

export default function handler(req, res) {
  const { word } = req.query;
  if (!word) {
    return res.status(400).json({ error: 'word query param is required' });
  }
  const sum = calculateWordSum(word);
  res.status(200).json({ word, sum });
}


