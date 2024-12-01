import { environment } from 'environments/environment.development';

export async function* prosConsStreamDiscusserUseCase(
  prompt: string,
  abortSignal: AbortSignal
) {
  try {
    const response = await fetch(
      `${environment.BACKEND_URL}/${environment.CASES.PROS_CONS_STREAM_DISCUSSER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );
    if (!response.ok)
      throw new Error('Could not make the pros cons discussion connection...');

    const reader = response.body?.getReader();

    if (!reader) throw new Error('Could not get the reader');

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const decodeChunk = decoder.decode(value, { stream: true });
      text += decodeChunk;
      yield text;
    }
    return await null;
  } catch (error) {
    return await null;
  }
}
