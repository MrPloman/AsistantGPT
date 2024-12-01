import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { Message, ProsConsDiscusserResponseInterface } from 'app/interfaces';
import { OpenAIService } from 'app/presentation/services/openAI.service';
import { ChatMessageMarkdownComponent } from '../../components/chat-bubbles/chat-message-markdown/chat-message-markdown.component';
import { MessagesProsAndConsMock } from 'app/mocks/messages-pros-and-cons.mock';

@Component({
  selector: 'app-pros-and-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    ChatMessageMarkdownComponent,
  ],
  templateUrl: './pros-and-cons-stream-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsAndConsStreamPageComponent {
  private openAIService = inject(OpenAIService);

  public messages = signal<Message[]>(MessagesProsAndConsMock);
  public isLoading = signal<boolean>(false);
  public abort = signal<AbortController>(new AbortController());

  public async handlePrompt(prompt: string) {
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
    const stream = this.openAIService.prosConsStreamDiscusser(
      prompt,
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
