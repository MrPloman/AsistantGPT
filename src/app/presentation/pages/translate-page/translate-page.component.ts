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
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { Message } from 'app/interfaces';
import { MessagesTranslate } from 'app/mocks/messages-translate.mock';
import { OpenAIService } from 'app/presentation/services/openAI.service';
import { TextMessageSelectBoxComponent } from '../../components/text-message-select-box/text-message-select-box.component';
import { LanguagesOptions } from 'app/mocks/languages-options.mock';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMessageComponent,
    TypingLoaderComponent,
    ChatMessageComponent,
    TextMessageSelectBoxComponent,
    TextMessageSelectBoxComponent,
  ],
  templateUrl: './translate-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  private openAIService = inject(OpenAIService);
  public languagesOptions = LanguagesOptions;

  public messages = signal<Message[]>(MessagesTranslate);
  public isLoading = signal<boolean>(false);
  public abort = signal<AbortController>(new AbortController());

  public async handlePrompt(prompt: string, option: string) {
    // Abort the last abort signal prompted (every time you write a prompt an abort signal is sent to the request)
    this.abort().abort();
    // Creating new abort signal which will be sent to the new request (in the previous step we aborted the previous request)
    this.abort.set(new AbortController());

    // Update messages method, creating your message and fake message from GPT, this message will be fulfilled with new info
    this.messages.update((oldMessages) => [
      ...oldMessages,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: '...',
      },
    ]);

    // Setting loading in true
    this.isLoading.set(true);

    // Getting the async stream from service, sending the prompt and the abortsignal value
    const stream = this.openAIService.translateStream(
      prompt,
      option,
      this.abort().signal
    );

    // Streams iteration which are sent from the backend
    for await (const text of stream) {
      // Setting load in false
      this.isLoading.set(false);
      // calling the method which is going to fullfiled the last GPT message with new info.
      this.handleMessagesFromStream(text);
    }
  }

  private handleMessagesFromStream(text: string) {
    // remove the fake gpt message
    this.messages().pop();
    // getting all the real messages already received from backend and sent from your request,
    const messages = this.messages();
    // setting the new messages with the original ones and the new one received from the stream
    this.messages.set([...messages, { isGpt: true, text: text }]);
  }
}
