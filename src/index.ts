export { createClient } from './client';
export { definePrompt } from './definePrompt';
export { openaiAdapter } from './adapters/openai';
export { geminiAdapter } from './adapters/gemini';  
export type { Prompt, ClientOptions, StreamChunk, BaseAdapter } from './types';
export type { OpenAIAdapterOptions } from './adapters/openai';
export type { GeminiAdapterOptions } from './adapters/gemini';
