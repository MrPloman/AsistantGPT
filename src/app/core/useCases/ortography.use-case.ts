import { environment } from 'environments/environment.development';
import { OrtographyResponseInterface } from '../../interfaces/ortography-response.interface';

export const ortographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.BACKEND_URL}/${environment.CASES.ORTOGRAPHY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok)
      throw new Error('Could not make the ortography correction');
    const data = (await response.json()) as OrtographyResponseInterface;
    return {
      success: true,
      ...data,
    };
  } catch (error) {
    return {
      success: false,
      userScore: 0,
      errors: [],
      message: 'No connection...',
    };
  }
};