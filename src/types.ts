import { z } from 'zod';

export interface Prompt<TInput, TOutput> {
  input: z.Schema<TInput>;
  output: z.Schema<TOutput>;
  template: (input: TInput) => string;
}

export interface AdapterOptions {
  apiKey: string;
  [key: string]: unknown;
}

export interface StreamChunk {
  text: string;
  done: boolean;
}

export interface ClientHooks {
  onToken?: (token: string) => void;
  onFinish?: (result: string) => void;
  onError?: (error: Error) => void;
}

export interface BaseAdapter {
  stream(prompt: string): Promise<AsyncGenerator<StreamChunk>>;
}

export interface ClientOptions {
  adapter: BaseAdapter;
  onToken?: (token: string) => void;
  onFinish?: (result: string) => void;
  onError?: (error: Error) => void;
}
