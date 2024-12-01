import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { Message } from 'app/interfaces';
import { OpenAIService } from 'app/presentation/services/openAI.service';

@Component({
  selector: 'app-pros-and-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-and-cons-stream-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsAndConsStreamPageComponent {
  public messages = signal<Message[]>([]);

  public isLoading = signal<boolean>(false);

  private openAIService = inject(OpenAIService);

  public handlePrompt(prompt: string) {
    console.log(prompt);
  }
  public handlePromptAndFile(data: { prompt: string; file: File }) {
    console.log(data);
  }
  public handleSelect(data: { prompt: string; option: string }) {
    console.log(data);
  }
}
