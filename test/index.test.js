import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateCost, countTokens, registerModel } from '../src/index.js';

test('anthropic estimate', () => {
  const r = estimateCost({ model: 'claude-sonnet-4-6', prompt: 'Hello world, how are you today?' });
  assert.equal(r.provider, 'Anthropic');
  assert.ok(r.inputTokens > 0 && r.cost.startsWith('$'));
});
test('output tokens add cost', () => {
  const a = estimateCost({ model: 'gpt-4o', prompt: 'hi' });
  const b = estimateCost({ model: 'gpt-4o', prompt: 'hi', outputTokens: 1000 });
  assert.ok(b.costUSD > a.costUSD);
});
test('exact math', () => {
  const r = estimateCost({ model: 'x', prompt: 'a'.repeat(400), pricing: { input: 1, output: 1 } });
  assert.equal(r.costUSD, r.inputTokens / 1e6);
});
test('dated id resolves by prefix', () => {
  assert.equal(estimateCost({ model: 'gpt-4o-2024-08-06', prompt: 'x' }).provider, 'OpenAI');
});
test('providers', () => {
  assert.equal(estimateCost({ model: 'gemini-2.5-flash', prompt: 'x' }).provider, 'Google Gemini');
  assert.equal(estimateCost({ model: 'llama-3.3-70b-versatile', prompt: 'x' }).provider, 'Groq');
});
test('unknown model throws; registerModel fixes it', () => {
  assert.throws(() => estimateCost({ model: 'foo-1', prompt: 'x' }), /Unknown model/);
  registerModel('foo-1', { input: 1, output: 2 });
  assert.equal(estimateCost({ model: 'foo-1', prompt: 'x' }).provider, 'Custom');
});
test('countTokens', () => {
  assert.equal(countTokens(''), 0);
  assert.throws(() => countTokens(5), TypeError);
});
