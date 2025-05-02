# @actionpackd/ignite-ai-sdk

A modular, streaming-first, adapter-based interface layer for fullstack AI applications.

## Features

- 🎯 Typed prompts with Zod schemas
- 🌊 Streaming-first architecture
- 🔌 Pluggable adapters (OpenAI supported)
- 🎣 Developer hooks for observability
- 📐 Framework-agnostic
- 🔒 Type-safe APIs
- 🌐 Edge-compatible

## Installation

```bash
npm install @actionpackd/ignite-ai-sdk
```

## Quick Start

```typescript
import { createClient, definePrompt, openaiAdapter } from '@actionpackd/ignite-ai-sdk';
import { z } from 'zod';

// Define a typed prompt
const chatPrompt = definePrompt({
  input: z.object({ message: z.string() }),
  output: z.object({ reply: z.string() }),
  template: ({ message }) => `User: ${message}\nAssistant:`,
});

// Create an AI client
const ai = createClient({
  adapter: openaiAdapter({ 
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-3.5-turbo'
  }),
  onToken: token => console.log('[Token]', token),
  onFinish: result => console.log('[Done]', result),
});

// Stream completions
const stream = await ai.stream(chatPrompt, { 
  message: "What's the weather like?" 
});

for await (const chunk of stream) {
  if (!chunk.done) {
    process.stdout.write(chunk.text);
  }
}
```

## API Reference

### `definePrompt()`

Creates a strongly-typed prompt template:

```typescript
const prompt = definePrompt({
  input: z.object({ ... }),  // Input schema
  output: z.object({ ... }), // Output schema
  template: (input) => string // Template function
});
```

### `createClient()`

Creates an AI client instance:

```typescript
const client = createClient({
  adapter: openaiAdapter({ ... }),
  onToken?: (token: string) => void,
  onFinish?: (result: string) => void,
  onError?: (error: Error) => void
});
```

### `openaiAdapter()`

Creates an OpenAI adapter:

```typescript
const adapter = openaiAdapter({
  apiKey: string,
  model?: string,       // default: 'gpt-3.5-turbo'
  temperature?: number  // default: 0.7
});
```

## License

MIT
