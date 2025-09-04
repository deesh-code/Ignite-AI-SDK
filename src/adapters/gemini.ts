
import axios from 'axios';
import { BaseAdapter, AdapterOptions, StreamChunk } from '../types';
import { createGeminiStream } from '../utils/gemini-stream';

export interface GeminiAdapterOptions extends AdapterOptions {
  project_id: string;
  location: string;
  model?: string;
}

export class GeminiAdapter implements BaseAdapter {
  private apiKey: string;
  private project_id: string;
  private location: string;
  private model: string;

  constructor(options: GeminiAdapterOptions) {
    this.apiKey = options.apiKey;
    this.project_id = options.project_id;
    this.location = options.location;
    this.model = options.model || 'gemini-1.5-flash-001';
  }

  async stream(prompt: string): Promise<AsyncGenerator<StreamChunk>> {
    const url = `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.project_id}/locations/${this.location}/publishers/google/models/${this.model}:streamGenerateContent`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      }
    );

    return createGeminiStream(response.data);
  }
}

export function geminiAdapter(options: GeminiAdapterOptions): BaseAdapter {
  return new GeminiAdapter(options);
}
