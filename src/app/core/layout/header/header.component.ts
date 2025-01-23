import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  private _router = inject(Router);

  onLogout(): void {
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
