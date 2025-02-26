import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState } from './trip.reducer';
import { TripStatus } from '../../shared/enums/trip-status.enum';

export const selectTripState = createFeatureSelector<TripState>('trip');

export const selectAllTrips = createSelector(
  selectTripState,
  (state) => state.trips || []
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

export const selectTripById = (id: string) =>
  createSelector(selectTripState, (trips) => {
    return trips.trips.find((trip) => trip.id === id) || null;
  });

export const selectApprovedTrips = createSelector(selectAllTrips, (trips) =>
  trips.filter((trip) => trip.status === TripStatus.APPROVED)
);
