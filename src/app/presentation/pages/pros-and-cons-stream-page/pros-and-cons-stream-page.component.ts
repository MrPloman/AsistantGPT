import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-and-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pros-and-cons-stream-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsAndConsStreamPageComponent { }
