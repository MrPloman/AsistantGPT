import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message-markdown',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './chat-message-markdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageMarkdownComponent {
  @Input({ required: true }) text: string = '';
}
