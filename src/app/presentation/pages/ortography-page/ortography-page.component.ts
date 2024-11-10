import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ortography-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ortography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrtographyPageComponent { }
