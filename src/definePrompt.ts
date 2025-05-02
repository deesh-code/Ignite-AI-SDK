import { z } from 'zod';
import { Prompt } from './types';

export function definePrompt<TInput, TOutput>(config: {
  input: z.Schema<TInput>;
  output: z.Schema<TOutput>;
  template: (input: TInput) => string;
}): Prompt<TInput, TOutput> {
  return {
    input: config.input,
    output: config.output,
    template: config.template,
  };
}
