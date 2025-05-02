import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { StreamChunk } from '../types';

export async function* createEventStream(response: Response): AsyncGenerator<StreamChunk> {
  const parser = createParser((event: ParsedEvent | ReconnectInterval) => {
    if (event.type === 'event') {
      return event.data;
    }
  });

  const decoder = new TextDecoder();
  const reader = response.body?.getReader();
  
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        yield { text: '', done: true };
        break;
      }

      const chunk = decoder.decode(value);
      parser.feed(chunk);

      if (chunk) {
        try {
          const data = JSON.parse(chunk);
          if (data.choices?.[0]?.delta?.content) {
            yield { text: data.choices[0].delta.content, done: false };
          }
        } catch (e) {
          // Skip invalid JSON chunks
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
