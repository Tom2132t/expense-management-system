import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectAllTrips } from '../../../store/trip/trip.selectors';
import { CommonModule } from '@angular/common';
import { TripModel } from '../../../shared/models/trip.model';
import * as TripActions from '../../../store/trip/trip.actions';
import { AppState } from '../../../store/app.state';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollDirective],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  private _store = inject(Store<AppState>);
  trips$: Observable<TripModel[]> = this._store.select(selectAllTrips);

  trips: TripModel[] = [];
  visibleTrips: TripModel[] = [];
  private _startIndex = 0;
  readonly batchSize = 5;

  ngOnInit(): void {
    this._store.dispatch(TripActions.loadTrips());

    this.trips$
      .pipe(
        tap((trips) => {
          if (trips.length > 0) {
            this.trips = trips;
            this._startIndex = 0;
            this.visibleTrips = [];
            this.loadMoreTrips();
          }
        })
      )
      .subscribe();
  }

  loadMoreTrips(): void {
    const nextTrips = this.trips.slice(
      this._startIndex,
      this._startIndex + this.batchSize
    );
    this.visibleTrips = [...this.visibleTrips, ...nextTrips];
    this._startIndex += this.batchSize;
  }

  onScroll(): void {
    if (this._startIndex < this.trips.length) {
      this.loadMoreTrips();
    }
  }

  onUpdate(trip: TripModel): void {}

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this._store.dispatch(TripActions.deleteTrip({ id }));
    }
  }
}
