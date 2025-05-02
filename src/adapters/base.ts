import { BaseAdapter, StreamChunk } from '../types';

export abstract class Adapter implements BaseAdapter {
  abstract stream(prompt: string): Promise<AsyncGenerator<StreamChunk>>;
}
