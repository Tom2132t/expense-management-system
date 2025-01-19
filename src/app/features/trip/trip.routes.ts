import { Routes } from '@angular/router';
import { Role } from '../../shared/enums/role.enum';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: '',
    data: { roles: [Role.FINANCE, Role.APPROVER] },
    children: [
      {
        path: 'list',
        component: TripListComponent
      },
      {
        path: 'create',
        component: TripDetailComponent
      },
      {
        path: ':TRIP_ID',
        component: TripDetailComponent
      }
    ]
  }
];
