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
  selector: 'app-text-message-file-box',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-message-file-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageFileBoxComponent {
  public fileAttached?: File = undefined;
  @Input() public placeholder: string = '';
  @Input() public disableCorrection: boolean = false;
  @Output() public onMessageAndFile: EventEmitter<{
    file: File;
    prompt: string;
  }> = new EventEmitter();

  private formBuilder = inject(FormBuilder);
  protected form = this.formBuilder.group({
    prompt: ['', Validators.required],
    file: [undefined, Validators.required],
  });

  public handleSelectedFile($event: any) {
    const file = $event.target.files[0];
    this.form.controls.file.setValue(file);
    console.log(this.form.controls);
  }

  public handleSubmit() {
    if (!this.form.valid) return;
    const { prompt, file } = this.form.value;
    if (prompt && file) {
      this.onMessageAndFile.emit({ prompt: prompt, file: file });
      this.form.reset();
    }
  }
}
