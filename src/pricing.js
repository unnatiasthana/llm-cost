// USD per 1M tokens: [input, output]. Approximate list prices; verify against
// the provider's pricing page, or override via the `pricing` option / registerModel().
export const PRICING = {
  // OpenAI
  'gpt-4o': ['OpenAI', 2.5, 10],
  'gpt-4o-mini': ['OpenAI', 0.15, 0.6],
  'gpt-4.1': ['OpenAI', 2, 8],
  'gpt-4.1-mini': ['OpenAI', 0.4, 1.6],
  // Anthropic
  'claude-sonnet-4-6': ['Anthropic', 3, 15],
  'claude-sonnet-4-5': ['Anthropic', 3, 15],
  'claude-haiku-4-5': ['Anthropic', 1, 5],
  'claude-opus-4-5': ['Anthropic', 5, 25],
  // Gemini
  'gemini-2.5-pro': ['Google Gemini', 1.25, 10],
  'gemini-2.5-flash': ['Google Gemini', 0.3, 2.5],
  // Groq
  'llama-3.3-70b-versatile': ['Groq', 0.59, 0.79],
  'llama-3.1-8b-instant': ['Groq', 0.05, 0.08],
};

const PREFIXES = [
  [/^(gpt|o\d|chatgpt)/i, 'OpenAI'],
  [/^claude/i, 'Anthropic'],
  [/^gemini/i, 'Google Gemini'],
  [/^(llama|mixtral|gemma)/i, 'Groq'],
];

export function inferProvider(model) {
  for (const [re, name] of PREFIXES) if (re.test(model)) return name;
  return undefined;
}
