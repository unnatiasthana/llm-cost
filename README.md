# llm-cost

Estimate token cost **before** you send the API call. OpenAI, Anthropic, Gemini, Groq. Zero dependencies.

```js
import { estimateCost } from 'llm-cost';

estimateCost({ model: 'claude-sonnet-4-6', prompt: myPrompt });
// → { inputTokens: 342, outputTokens: 0, cost: '$0.0010', costUSD: 0.001026, provider: 'Anthropic' }

estimateCost({ model: 'gpt-4o', prompt, outputTokens: 500 }); // include expected output
```

## Custom models / prices
```js
import { registerModel } from 'llm-cost';
registerModel('my-model', { provider: 'Acme', input: 1.0, output: 3.0 }); // USD per 1M tokens
// or per call: estimateCost({ model, prompt, pricing: { input: 1, output: 3 } })
```

## Built-in models (USD per 1M tokens, input / output)

| Provider | Model | Price | Status (checked 2026-11-23) |
|---|---|---|---|
| Anthropic | claude-sonnet-4-6, claude-sonnet-4-5 | $3 / $15 | verified |
| Anthropic | claude-haiku-4-5 | $1 / $5 | verified |
| Anthropic | claude-opus-4-5 | $5 / $25 | verified |
| Google Gemini | gemini-2.5-pro | $1.25 / $10 (prompts ≤200k) | verified; deprecated by Google |
| Google Gemini | gemini-2.5-flash | $0.30 / $2.50 | verified; deprecated by Google |
| OpenAI | gpt-4o, gpt-4o-mini, gpt-4.1, gpt-4.1-mini | $2.50/$10, $0.15/$0.60, $2/$8, $0.40/$1.60 | not re-verified |
| Groq | llama-3.3-70b-versatile, llama-3.1-8b-instant | $0.59/$0.79, $0.05/$0.08 | not re-verified |

Gemini long-prompt tiers (>200k tokens) are not modelled; use `pricing` to override.

## Accuracy
Token counts are a fast heuristic (~4 chars/token), typically within ~10–20% of real tokenizers; no tokenizer is bundled. Prices are approximate list prices and change often. Check your provider's pricing page, or override as above.

## License
MIT
