import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as TripActions from './trip.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TripService } from '../../core/services/trip.service';

@Injectable()
export class TripEffects {
  private _actions$ = inject(Actions);
  private _tripService = inject(TripService);

  loadTrips$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TripActions.loadTrips),
      mergeMap(() =>
        this._tripService.getTrips().pipe(
          map((trips) => TripActions.loadTripsSuccess({ trips })),
          catchError((error) =>
            of(TripActions.loadTripsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTrip$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TripActions.addTrip),
      mergeMap(({ trip }) =>
        this._tripService.createTrip(trip).pipe(
          map((newTrip) => TripActions.addTripSuccess({ trip: newTrip })),
          catchError((error) =>
            of(TripActions.addTripFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTrip$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TripActions.deleteTrip),
      mergeMap(({ id }) =>
        this._tripService.deleteTrip(id).pipe(
          map(() => TripActions.deleteTripSuccess({ id })),
          catchError((error) =>
            of(TripActions.deleteTripFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadTripById$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TripActions.loadTripById),
      mergeMap(({ id }) =>
        this._tripService.getTripById(id).pipe(
          map((trip) => TripActions.loadTripByIdSuccess({ trip })),
          catchError((error) =>
            of(TripActions.loadTripByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
