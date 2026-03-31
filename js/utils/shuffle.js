/**
 * Shuffle utility using Fisher-Yates algorithm
 * Ensures deterministic randomization for question order
 */

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestions(questions) {
  return shuffleArray(questions);
}
