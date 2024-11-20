import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageFileBoxComponent } from '@components/text-message-file-box/text-message-file-box.component';
import { TextMessageSelectBoxComponent } from '@components/text-message-select-box/text-message-select-box.component';
import { Message } from 'app/interfaces/message.interface';
import { MessagesMock } from 'app/mocks/messages.mock';
import { OpenAIService } from '../../services/openAI.service';
import { OrtographyResponseInterface } from 'app/interfaces';
import { ChatBubbleOrtographyComponent } from '../../components/chat-bubbles/chat-bubble-ortography/chat-bubble-ortography.component';
import { OrtographyMessage } from '../../../interfaces/ortography.message.interface';

@Component({
  selector: 'app-ortography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    ChatBubbleOrtographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    ChatBubbleOrtographyComponent,
  ],
  templateUrl: './ortography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {
  public messages = signal<OrtographyMessage[]>(MessagesMock);

  public isLoading = signal<boolean>(false);

  private openAIService = inject(OpenAIService);

  public handlePrompt(prompt: string) {
    console.log(prompt);
    this.messages.update((oldMessages) => [
      ...oldMessages,
      {
        isGpt: false,
        text: prompt,
      },
    ]);

    this.isLoading.set(true);
    this.openAIService
      .checkOrtography(prompt)
      .subscribe((newMessage: OrtographyResponseInterface) => {
        console.log(newMessage);
        if (!newMessage) return;
        this.messages.update((oldMessages) => [
          ...oldMessages,
          {
            isGpt: true,
            text: '',
            ...newMessage,
          },
        ]);
        this.isLoading.set(false);
      });
  }
}
