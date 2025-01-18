import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  standalone: true
})
export class TogglePasswordDirective {
  private _el = inject(ElementRef);

  @HostListener('click') onClick() {
    const inputElement = this._el.nativeElement
      .closest('div')
      .querySelector('input');

    if (inputElement) {
      inputElement.type =
        inputElement.type === 'password' ? 'text' : 'password';
    }
  }
}
