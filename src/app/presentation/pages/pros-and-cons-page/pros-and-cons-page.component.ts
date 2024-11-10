import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-and-cons-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pros-and-cons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsAndConsPageComponent { }
