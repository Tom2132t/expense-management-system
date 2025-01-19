import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent)
  }
];
