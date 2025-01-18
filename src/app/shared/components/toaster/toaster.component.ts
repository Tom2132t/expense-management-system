import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    id="toast-container"
    class="toast toast-top toast-end"
  ></div> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent {}
