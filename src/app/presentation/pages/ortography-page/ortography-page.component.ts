import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';

@Component({
  selector: 'app-ortography-page',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent, MyMessageComponent],
  templateUrl: './ortography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {}
