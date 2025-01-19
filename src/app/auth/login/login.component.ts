import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { TogglePasswordDirective } from '../../shared/directives/toggle-password.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TogglePasswordDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form: FormGroup = this._fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this._authService
        .login(this.form.value)
        .pipe(
          tap(() => {
            this._router.navigate(['/dashboard']);
          })
        )
        .subscribe();
    }
  }
}
