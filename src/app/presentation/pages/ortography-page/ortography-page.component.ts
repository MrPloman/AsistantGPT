import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageFileBoxComponent } from '@components/text-message-file-box/text-message-file-box.component';
import { TextMessageSelectBoxComponent } from '@components/text-message-select-box/text-message-select-box.component';

@Component({
  selector: 'app-ortography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageFileBoxComponent,
    TextMessageSelectBoxComponent,
    TextMessageSelectBoxComponent,
  ],
  templateUrl: './ortography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {
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
