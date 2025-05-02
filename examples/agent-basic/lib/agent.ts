import { createClient, openaiAdapter } from '@actionpackd/ignite-ai-sdk';
import { agentPrompt } from './prompts';
import type { AgentStep, Tool } from './types';

export const tools: Tool[] = [
  {
    name: 'calculator',
    description: 'Performs basic math operations',
    execute: async ({ expression }) => {
      try {
        return String(eval(expression));
      } catch (e) {
        return 'Error: Invalid mathematical expression';
      }
    },
  },
  {
    name: 'weather',
    description: 'Gets the current weather for a location',
    execute: async ({ location }) => {
      // Mock weather data
      return `It's sunny and 72°F in ${location}`;
    },
  },
];

const ai = createClient({
  adapter: openaiAdapter({
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-3.5-turbo',
  }),
});

export async function* runAgent(query: string) {
  const steps: AgentStep[] = [];

  while (true) {
    // Get next action from the agent
    const stream = await ai.stream(agentPrompt, {
      query,
      previousSteps: steps,
    });

    let thoughts = '';
    let toolName = '';
    let toolArgs = '';
    
    for await (const chunk of stream) {
      if (chunk.text) {
        const text = chunk.text;
        if (text.includes('Tool:')) {
          toolName = text.split('Tool:')[1].trim();
        } else if (text.includes('Args:')) {
          toolArgs = text.split('Args:')[1].trim();
        } else {
          thoughts += text;
        }
        yield { text };
      }
    }

    // If no tool specified, this is the final answer
    if (!toolName) {
      steps.push({
        plan: { thoughts },
        action: { finalAnswer: thoughts },
      });
      break;
    }

    // Execute the tool
    const tool = tools.find(t => t.name === toolName);
    if (!tool) {
      steps.push({
        plan: { thoughts },
        action: { finalAnswer: `Error: Tool ${toolName} not found` },
      });
      break;
    }

    try {
      const args = JSON.parse(toolArgs);
      const result = await tool.execute(args);
      steps.push({
        plan: {
          thoughts,
          tool: { name: toolName, args },
        },
        action: { toolOutput: result },
      });
    } catch (e) {
      steps.push({
        plan: { thoughts },
        action: { finalAnswer: `Error executing tool: ${e}` },
      });
      break;
    }
  }

  return steps;
}
