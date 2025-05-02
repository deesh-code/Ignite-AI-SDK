// Mock embedding function using simple TF-IDF-like approach
export function embed(text: string): number[] {
  const words = text.toLowerCase().split(/\W+/);
  const uniqueWords = [...new Set(words)];
  const vector = new Array(128).fill(0);
  
  uniqueWords.forEach((word, i) => {
    const hash = simpleHash(word);
    vector[hash % 128] += 1;
  });
  
  // Normalize the vector
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(val => val / magnitude);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
