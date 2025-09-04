
import { StreamChunk } from '../types';

export async function* createGeminiStream(response: any): AsyncGenerator<StreamChunk> {
  const reader = response.getReader();
  const decoder = new TextDecoder();

  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        if (buffer.length > 0) {
          const parsed = JSON.parse(buffer);
          if (parsed[0].candidates[0].content.parts[0].text) {
            yield { text: parsed[0].candidates[0].content.parts[0].text, done: false };
          }
        }
        yield { text: '', done: true };
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        if (line.startsWith('[') || line.startsWith(',')) {
          const jsonLine = line.startsWith(',') ? line.substring(1) : line.substring(1);
          if (jsonLine.length > 0) {
            try {
              const parsed = JSON.parse(jsonLine);
              if (parsed.candidates[0].content.parts[0].text) {
                yield { text: parsed.candidates[0].content.parts[0].text, done: false };
              }
            } catch (e) {
              //  maybe a partial line
            }
          }
        }
      }
      buffer = lines[lines.length - 1];
    }
  } finally {
    reader.releaseLock();
  }
}
