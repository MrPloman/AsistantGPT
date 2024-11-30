import { ProsConsDiscusserResponseInterface } from 'app/interfaces';
import { environment } from 'environments/environment.development';

export const prosConsDiscusserUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.BACKEND_URL}/${environment.CASES.PROS_CONS_DISCUSSER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok)
      throw new Error('Could not make the pros cons discussion connection...');
    if (!response)
      return {
        success: false,
        role: '',
        content: '',
        refusal: true,
      };
    const data = (await response.json()) as ProsConsDiscusserResponseInterface;
    return {
      success: true,
      ...data,
    };
  } catch (error) {
    return {
      success: false,
      role: '',
      content: '',
      refusal: true,
    };
  }
};
