import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState } from './trip.reducer';

export const selectTripState = createFeatureSelector<TripState>('trip');

export const selectAllTrips = createSelector(
  selectTripState,
  (state) => state.trips
);

export const selectLoading = createSelector(
  selectTripState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTripState,
  (state) => state.error
);

export const selectSelectedTrip = createSelector(
  selectTripState,
  (state) => state.selectedTrip
);
