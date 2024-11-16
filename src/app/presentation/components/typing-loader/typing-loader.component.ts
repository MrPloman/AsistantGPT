import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  styleUrls: ['./typing-loader.component.scss'],
  imports: [CommonModule],
  templateUrl: './typing-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent {}
