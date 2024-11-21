import { Injectable } from '@angular/core';
import { ortographyUseCase } from 'app/core/useCases/ortography.use-case';
import { prosConsDiscusserUseCase } from 'app/core/useCases/pros-cons-dicsusser-case';
import {
  OrtographyResponseInterface,
  ProsConsDiscusserResponseInterface,
} from 'app/interfaces';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  constructor() {}
  public checkOrtography(
    prompt: string
  ): Observable<OrtographyResponseInterface> {
    return from(ortographyUseCase(prompt));
  }
  public prosConsDiscusser(
    prompt: string
  ): Observable<ProsConsDiscusserResponseInterface> {
    return from(prosConsDiscusserUseCase(prompt));
  }
}
