import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  @Input() public placeholder: string = '';
  @Input() public disableCorrection: boolean = false;
  @Output() public onMessage: EventEmitter<string> = new EventEmitter();

  private formBuilder = inject(FormBuilder);
  protected form = this.formBuilder.group({
    prompt: ['', Validators.required],
  });

  public handleSubmit() {
    if (!this.form.valid) return;
    const { prompt } = this.form.value;
    this.onMessage.emit(prompt ?? '');
    this.form.reset();
  }
}
