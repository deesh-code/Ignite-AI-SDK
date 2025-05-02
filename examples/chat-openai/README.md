# Chat OpenAI Example

A streaming chat application built with Next.js and @actionpackd/ignite-ai-sdk, featuring real-time token streaming and a modern UI.

![Chat Demo](./public/chat-demo.gif)

## Features

- 🌊 Real-time token streaming
- 💬 Modern chat UI with Tailwind CSS
- 🎯 Fully typed prompts with Zod
- 🔌 OpenAI adapter integration
- 🎣 Developer hooks for token events
- ⚡ Edge runtime support

## Stack

- Framework: Next.js 14
- Runtime: Edge
- UI: Tailwind CSS
- Provider: OpenAI
- Type Safety: TypeScript + Zod

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
# .env.local
OPENAI_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the chat interface.

## Key Implementation Details

### Typed Prompts
```typescript
const chatPrompt = definePrompt({
  input: z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })),
  }),
  output: z.object({
    reply: z.string(),
  }),
  template: ({ messages }) => {
    return messages
      .map(({ role, content }) => `${role}: ${content}`)
      .join('\n') + '\nassistant:';
  },
});
```

### Streaming Setup
```typescript
const stream = await ai.stream(chatPrompt, { messages });
for await (const chunk of stream) {
  if (chunk.text) {
    // Handle streaming token
  }
}
```

### Developer Hooks
```typescript
const ai = createClient({
  adapter: openaiAdapter({ ... }),
  onToken: (token) => console.log('[Token]', token),
  onFinish: (result) => console.log('[Done]', result),
});
```

## Deployment

This example is ready to be deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ActionpackdHQ/ai-sdk/tree/main/examples/chat-openai)

## Learn More

- [@actionpackd/ignite-ai-sdk Documentation](https://github.com/actionpackd/ignite-ai-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

## License

MIT
