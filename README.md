# llm-cost

Estimate token cost **before** you send the API call. OpenAI, Anthropic, Gemini, Groq. Zero dependencies.

```js
import { estimateCost } from 'llm-cost';

estimateCost({ model: 'claude-sonnet-4-6', prompt: myPrompt });
// → { inputTokens: 342, outputTokens: 0, cost: '$0.0010', costUSD: 0.001026, provider: 'Anthropic' }

estimateCost({ model: 'gpt-4o', prompt, outputTokens: 500 }); // include expected output
```

## Accuracy
Token counts are a fast heuristic (~4 chars/token), typically within ~10–20% of real tokenizers; no tokenizer is bundled. Prices are approximate list prices and change often. Check your provider's pricing page, or override as above.

## License
MIT
