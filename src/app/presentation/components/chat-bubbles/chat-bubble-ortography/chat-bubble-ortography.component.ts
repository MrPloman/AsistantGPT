import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrtographyResponseInterface } from 'app/interfaces';

@Component({
  selector: 'app-chat-bubble-ortography',
  standalone: true,
  imports: [],
  templateUrl: './chat-bubble-ortography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBubbleOrtographyComponent {
  @Input({ required: true }) userScore: number = 0;
  @Input({ required: true }) errors: string[] = [];
  @Input({ required: true }) message_checked: string = '';
  @Input({ required: true }) review: string = '';
}
