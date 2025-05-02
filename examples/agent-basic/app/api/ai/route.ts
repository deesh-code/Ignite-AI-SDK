import { StreamChunk } from '@actionpackd/ai-sdk';
import { runAgent } from '../../../lib/agent';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { query } = await req.json() as { query: string };

  try {
    const agentStream = await runAgent(query);

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of agentStream) {
              if (chunk.text) {
                controller.enqueue(
                  `data: ${JSON.stringify(chunk)}\n\n`
                );
              }
            }
            controller.close();
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
