import { ClientOptions, Prompt, StreamChunk } from './types';

export class AIClient {
  private adapter: ClientOptions['adapter'];
  private hooks: {
    onToken?: (token: string) => void;
    onFinish?: (result: string) => void;
    onError?: (error: Error) => void;
  };

  constructor(options: ClientOptions) {
    this.adapter = options.adapter;
    this.hooks = {
      onToken: options.onToken,
      onFinish: options.onFinish,
      onError: options.onError,
    };
  }

  async stream<TInput, TOutput>(
    prompt: Prompt<TInput, TOutput>,
    input: TInput
  ): Promise<AsyncGenerator<StreamChunk>> {
    try {
      const renderedPrompt = prompt.template(input);
      const stream = await this.adapter.stream(renderedPrompt);
      let fullText = '';

      const self = this;
      const generator = (async function* () {
        try {
          for await (const chunk of stream) {
            if (chunk.text) {
              fullText += chunk.text;
              self.hooks.onToken?.(chunk.text);
            }
            
            if (chunk.done) {
              self.hooks.onFinish?.(fullText);
            }
            
            yield chunk;
          }
        } catch (error) {
          self.hooks.onError?.(error as Error);
          throw error;
        }
      })();

      return generator;
    } catch (error) {
      this.hooks.onError?.(error as Error);
      throw error;
    }
  }
}

export function createClient(options: ClientOptions): AIClient {
  return new AIClient(options);
}
