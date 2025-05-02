import { createClient, openaiAdapter, definePrompt } from '@actionpackd/ai-sdk';
import { z } from 'zod';
import type { Message } from '../../../../lib/types';

export const runtime = 'edge';

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

const ai = createClient({
  adapter: openaiAdapter({
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-3.5-turbo',
  }),
  onToken: (token) => {
    console.log('[Token]', token);
  },
  onFinish: (result) => {
    console.log('[Done]', result);
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: Message[] };

  try {
    const stream = await ai.stream(chatPrompt, { messages });

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.text) {
                controller.enqueue(
                  `data: ${JSON.stringify(chunk)}\n\n`
                );
              }
              if (chunk.done) {
                controller.close();
              }
            }
          } catch (error) {
            controller.error(error);
          }
        },
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
