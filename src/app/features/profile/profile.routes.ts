import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../profile/profile.component').then((c) => c.ProfileComponent)
  }
];
