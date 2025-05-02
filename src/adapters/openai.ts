import axios from 'axios';
import { BaseAdapter, AdapterOptions, StreamChunk } from '../types';
import { createEventStream } from '../utils/stream';

export interface OpenAIAdapterOptions extends AdapterOptions {
  model?: string;
  temperature?: number;
}

export class OpenAIAdapter implements BaseAdapter {
  private apiKey: string;
  private model: string;
  private temperature: number;

  constructor(options: OpenAIAdapterOptions) {
    this.apiKey = options.apiKey;
    this.model = options.model || 'gpt-3.5-turbo';
    this.temperature = options.temperature ?? 0.7;
  }

  async stream(prompt: string): Promise<AsyncGenerator<StreamChunk>> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: this.temperature,
        stream: true,
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        responseType: 'stream',
      }
    );

    return createEventStream(response.data);
  }
}

export function openaiAdapter(options: OpenAIAdapterOptions): BaseAdapter {
  return new OpenAIAdapter(options);
}
