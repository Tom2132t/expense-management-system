import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);

  userForm: FormGroup = this._fb.group({
    user: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    role: [{ value: '', disabled: true }]
  });

  ngOnInit(): void {
    this._loadUserData();
  }

  private _loadUserData() {
    const userData = this._authService.user;

    this.userForm.patchValue({
      user: userData?.name,
      email: userData?.email,
      role: [userData?.role]
    });
  }
}
