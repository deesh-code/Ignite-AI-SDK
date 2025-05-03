import { definePrompt } from '@actionpackd/ignite-ai-sdk';
import { z } from 'zod';
import type { AgentStep } from './types';

export const agentPrompt = definePrompt({
  input: z.object({
    query: z.string(),
    previousSteps: z.array(z.object({
      plan: z.object({
        thoughts: z.string(),
        tool: z.object({
          name: z.string(),
          args: z.record(z.any()),
        }).optional(),
      }),
      action: z.object({
        toolOutput: z.string().optional(),
        finalAnswer: z.string().optional(),
      }),
    })).optional(),
  }),
  output: z.object({
    response: z.string(),
  }),
  template: ({ query, previousSteps = [] }) => `
Query: ${query}

${previousSteps.map((step, i) => `
Step ${i + 1}:
Thoughts: ${step.plan.thoughts}
${step.plan.tool ? `Tool: ${step.plan.tool.name}
Args: ${JSON.stringify(step.plan.tool.args)}` : ''}
${step.action.toolOutput ? `Tool Output: ${step.action.toolOutput}` : ''}
${step.action.finalAnswer ? `Final Answer: ${step.action.finalAnswer}` : ''}
`).join('\n')}`,
});
