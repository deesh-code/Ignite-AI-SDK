import { definePrompt } from '@actionpackd/ignite-ai-sdk';
import { z } from 'zod';
import type { Document } from './recall';

export const ragPrompt = definePrompt({
  input: z.object({
    query: z.string(),
    context: z.array(z.object({
      content: z.string(),
    })),
  }),
  output: z.object({
    answer: z.string(),
  }),
  template: ({ query, context }: { 
    query: string; 
    context: Array<{ content: string }> 
  }) => `
Answer the following question using only the provided context. If you cannot find the answer in the context, say "I cannot answer this question based on the provided context."

Context:
${context.map((doc: { content: string }, i: number) => `[${i + 1}] ${doc.content}`).join('\n')}

Question: ${query}

Answer:`,
});
