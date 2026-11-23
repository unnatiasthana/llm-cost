import { PRICING, inferProvider } from './pricing.js';

/** Rough token estimate (~4 chars/token, word-aware). No tokenizer dependency. */
export function countTokens(text) {
  if (typeof text !== 'string') throw new TypeError('prompt must be a string');
  if (!text) return 0;
  const byChars = text.length / 4;
  const byWords = (text.match(/\S+/g)?.length ?? 0) * 1.3;
  return Math.max(1, Math.ceil((byChars + byWords) / 2));
}

function lookup(model) {
  if (PRICING[model]) return PRICING[model];
  // longest-prefix match so dated ids like "gpt-4o-2024-08-06" resolve
  const key = Object.keys(PRICING).filter((k) => model.startsWith(k)).sort((a, b) => b.length - a.length)[0];
  return key ? PRICING[key] : undefined;
}

const fmt = (n) => '$' + (n >= 0.01 ? n.toFixed(2) : n.toFixed(4));

/**
 * @param {{model: string, prompt: string, outputTokens?: number,
 *          pricing?: {input: number, output: number}}} opts
 * @returns {{inputTokens: number, outputTokens: number, cost: string, costUSD: number, provider: string}}
 */
export function estimateCost({ model, prompt, outputTokens = 0, pricing } = {}) {
  if (!model) throw new TypeError('model is required');
  const entry = pricing
    ? [inferProvider(model) ?? 'Custom', pricing.input, pricing.output]
    : lookup(model);
  if (!entry) throw new Error(`Unknown model "${model}". Pass { pricing } or call registerModel().`);
  const [provider, inRate, outRate] = entry;
  const inputTokens = countTokens(prompt);
  const costUSD = (inputTokens * inRate + outputTokens * outRate) / 1e6;
  return { inputTokens, outputTokens, cost: fmt(costUSD), costUSD, provider };
}

export default estimateCost;
