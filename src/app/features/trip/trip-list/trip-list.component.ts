import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectAllTrips } from '../../../store/trip/trip.selectors';
import { CommonModule } from '@angular/common';
import { TripModel } from '../../../shared/models/trip.model';
import * as TripActions from '../../../store/trip/trip.actions';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})
export class TripListComponent implements OnInit {
  private _store = inject(Store<AppState>);
  trips$: Observable<TripModel[]> = this._store.select(selectAllTrips);

  ngOnInit(): void {
    this._store.dispatch(TripActions.loadTrips());
  }

  onUpdate(trip: TripModel): void {}

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this._store.dispatch(TripActions.deleteTrip({ id }));
    }
  }
}
