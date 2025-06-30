import { createClient, openaiAdapter, definePrompt } from '@actionpackd/ignite-ai-sdk';
import { NextResponse } from 'next/server';
export const runtime = 'edge';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 400 }
      );
    }

    // Define a simple prompt for the agent
    const agentPrompt = definePrompt({
      input: z.object({
        query: z.string(),
      }),
      output: z.object({
        response: z.string(),
      }),
      template: ({ query }) => `You are a helpful AI agent that can assist with various tasks.

User query: ${query}

Provide a helpful response:`,
    });

    const ai = createClient({
      adapter: openaiAdapter({
        apiKey: process.env.OPENAI_API_KEY,
        model: 'gpt-3.5-turbo',
      })
    });

    // Get streaming response
    const stream = await ai.stream(agentPrompt, { query });

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
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
