import { createAction, props } from '@ngrx/store';
import { TripModel } from '../../shared/models/trip.model';

// Load Trips
export const loadTrips = createAction('[Trip] Load Trips');
export const loadTripsSuccess = createAction(
  '[Trip] Load Trips Success',
  props<{ trips: TripModel[] }>()
);
export const loadTripsFailure = createAction(
  '[Trip] Load Trips Failure',
  props<{ error: string }>()
);

// Add Trip
export const addTrip = createAction(
  '[Trip] Add Trip',
  props<{ trip: TripModel }>()
);
export const addTripSuccess = createAction(
  '[Trip] Add Trip Success',
  props<{ trip: TripModel }>()
);
export const addTripFailure = createAction(
  '[Trip] Add Trip Failure',
  props<{ error: string }>()
);

// Update Trip
export const updateTrip = createAction(
  '[Trip] Update Trip',
  props<{ id: string; trip: TripModel }>()
);
export const updateTripSuccess = createAction(
  '[Trip] Update Trip Success',
  props<{ trip: TripModel }>()
);
export const updateTripFailure = createAction(
  '[Trip] Update Trip Failure',
  props<{ error: string }>()
);

// Delete Trip
export const deleteTrip = createAction(
  '[Trip] Delete Trip',
  props<{ id: string }>()
);
export const deleteTripSuccess = createAction(
  '[Trip] Delete Trip Success',
  props<{ id: string }>()
);
export const deleteTripFailure = createAction(
  '[Trip] Delete Trip Failure',
  props<{ error: string }>()
);

export const loadTripById = createAction(
  '[Trip API] Load Trip By ID',
  props<{ id: string }>()
);

export const loadTripByIdSuccess = createAction(
  '[Trip API] Load Trip By ID Success',
  props<{ trip: TripModel }>()
);

export const loadTripByIdFailure = createAction(
  '[Trip API] Load Trip By ID Failure',
  props<{ error: string }>()
);
