import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { Message, ProsConsDiscusserResponseInterface } from 'app/interfaces';
import { OpenAIService } from 'app/presentation/services/openAI.service';
import { ChatMessageMarkdownComponent } from '../../components/chat-bubbles/chat-message-markdown/chat-message-markdown.component';
import { MessagesProsAndConsMock } from 'app/mocks/messages-pros-and-cons.mock';

@Component({
  selector: 'app-pros-and-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    ChatMessageMarkdownComponent,
  ],
  templateUrl: './pros-and-cons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsAndConsPageComponent {
  public messages = signal<Message[]>(MessagesProsAndConsMock);
  private openAIService = inject(OpenAIService);

  public isLoading = signal<boolean>(false);
  public handlePrompt(prompt: string) {
    this.messages.update((oldMessages) => [
      ...oldMessages,
      {
        isGpt: false,
        text: prompt,
      },
    ]);

    this.isLoading.set(true);
    this.openAIService
      .prosConsDiscusser(prompt)
      .subscribe((newMessage: ProsConsDiscusserResponseInterface) => {
        if (!newMessage || newMessage.refusal) return;
        this.messages.update((oldMessages) => [
          ...oldMessages,
          {
            isGpt: true,
            text: newMessage.content,
          },
        ]);
        this.isLoading.set(false);
      });
  }
}
