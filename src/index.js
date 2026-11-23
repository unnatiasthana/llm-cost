/** Rough token estimate (~4 chars/token, word-aware). No tokenizer dependency. */
export function countTokens(text) {
  if (typeof text !== 'string') throw new TypeError('prompt must be a string');
  if (!text) return 0;
  const byChars = text.length / 4;
  const byWords = (text.match(/\S+/g)?.length ?? 0) * 1.3;
  return Math.max(1, Math.ceil((byChars + byWords) / 2));
}
