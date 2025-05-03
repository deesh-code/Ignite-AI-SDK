# RAG Basic Example

A basic RAG (Retrieval Augmented Generation) implementation using Next.js and @actionpackd/ignite-ai-sdk, featuring vector similarity search.

## Features

- 🔍 Vector similarity search
- 🌊 Real-time token streaming
- 💾 Document storage
- 🎯 Fully typed prompts with Zod
- 🔌 OpenAI adapter integration
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

4. Open [http://localhost:3000](http://localhost:3000) to see the RAG interface.

## Deployment

This example is ready to be deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ActionpackdHQ/Ignite-AI-SDK/tree/main/examples/rag-basic)

## Learn More

- [@actionpackd/ignite-ai-sdk Documentation](https://github.com/ActionpackdHQ/Ignite-AI-SDK)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

## License

MIT
