import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { canActivate, canActivateChild } from './auth/guards/auth.guard';
import { Role } from './shared/enums/role.enum';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../app/auth/auth.routes').then((m) => m.ROUTES)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [canActivateChild],
    canActivate: [canActivate],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app/features/dashboard/dashboard.routes').then(
            (m) => m.ROUTES
          ),
        data: { roles: [Role.FINANCE, Role.APPROVER] }
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      )
  }
];
