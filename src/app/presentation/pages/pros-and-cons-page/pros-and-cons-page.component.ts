import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';

@Component({
  selector: 'app-pros-and-cons-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pros-and-cons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsAndConsPageComponent {}
