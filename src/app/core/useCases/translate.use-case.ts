import { environment } from 'environments/environment.development';

export async function* translateStreamUseCase(
  prompt: string,
  language: string,
  abortSignal: AbortSignal
) {
  try {
    // Response to await, important to send the abortSignal in the req
    const response = await fetch(
      `${environment.BACKEND_URL}/${environment.CASES.TRANSLATE_STREAM}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, language }),
        signal: abortSignal,
      }
    );

    // Control structure to prevent no response
    if (!response || !response.ok)
      throw new Error('Could not make the translate discussion connection...');

    // Get reader of the response. This object is only for streams
    const reader = response.body?.getReader();
    // Preventions when the reader is not gotten.
    if (!reader) throw new Error('Could not get the reader');

    // Create a decoder which allows to translate the stream object to text
    const decoder = new TextDecoder();
    // Initialize text variable
    let text = '';

    // Infinite bucle which is going to be finished when the stream is ended.
    while (true) {
      // Get the value of each stream and done value, which indicates if it is already finished
      const { value, done } = await reader.read();
      if (done) break;
      // Use the decoder to get the text from the stream
      const decodeChunk = decoder.decode(value, { stream: true });
      text += decodeChunk;
      yield text;
    }
    return await null;
  } catch (error) {
    return await null;
  }
}
