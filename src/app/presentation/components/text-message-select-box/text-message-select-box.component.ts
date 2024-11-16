import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-select-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-select-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageSelectBoxComponent {
  @Input({ required: true }) public options: { value: string; id: string }[] =
    [];

  @Input() public placeholder: string = '';
  @Output() public onMessage: EventEmitter<{ prompt: string; option: string }> =
    new EventEmitter();

  private formBuilder = inject(FormBuilder);
  protected form = this.formBuilder.group({
    prompt: ['', Validators.required],
    option: ['', Validators.required],
  });

  public handleSubmit() {
    if (!this.form.valid) return;
    const { prompt, option } = this.form.value;
    if (prompt && option) this.onMessage.emit({ prompt, option });
    this.form.reset();
  }
}
