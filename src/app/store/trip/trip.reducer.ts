import { createReducer, on } from '@ngrx/store';
import * as TripActions from './trip.actions';
import { TripModel } from '../../shared/models/trip.model';

export interface TripState {
  trips: TripModel[];
  selectedTrip: TripModel | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TripState = {
  trips: [],
  selectedTrip: null,
  loading: false,
  error: null
};

export const tripReducer = createReducer(
  initialState,
  on(TripActions.loadTrips, (state) => ({ ...state, loading: true })),
  on(TripActions.loadTripsSuccess, (state, { trips }) => ({
    ...state,
    loading: false,
    trips
  })),
  on(TripActions.loadTripsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TripActions.addTripSuccess, (state, { trip }) => ({
    ...state,
    trips: [...state.trips, trip]
  })),
  on(TripActions.updateTripSuccess, (state, { trip }) => ({
    ...state,
    trips: state.trips.map((t) => (t.id === trip.id ? trip : t))
  })),
  on(TripActions.deleteTripSuccess, (state, { id }) => ({
    ...state,
    trips: state.trips.filter((t) => t.id !== id)
  })),
  on(TripActions.loadTripById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TripActions.loadTripByIdSuccess, (state, { trip }) => ({
    ...state,
    trips: [...state.trips.filter((t) => t.id !== trip.id), trip], // Update or add trip
  })),
  on(TripActions.loadTripByIdFailure, (state, { error }) => ({
    ...state,
    selectedTrip: null,
    loading: false,
    error
  }))
);
