import { Injectable } from '@angular/core';
import { ortographyUseCase } from 'app/core/useCases/ortography.use-case';
import { OrtographyResponseInterface } from 'app/interfaces';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  constructor() {}
  public checkOrtography(
    prompt: string
  ): Observable<OrtographyResponseInterface> {
    return from(ortographyUseCase(prompt));
  }
}
