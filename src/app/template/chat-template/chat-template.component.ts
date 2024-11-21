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
import { TextMessageFileBoxComponent } from '@components/text-message-file-box/text-message-file-box.component';
import { TextMessageSelectBoxComponent } from '@components/text-message-select-box/text-message-select-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { Message } from 'app/interfaces/message.interface';
import { MessagesMock } from 'app/mocks/messages.mock';
import { OpenAIService } from 'app/presentation/services/openAI.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chat-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>(MessagesMock);

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
