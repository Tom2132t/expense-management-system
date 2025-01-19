import { ActionReducerMap } from '@ngrx/store';
import { tripReducer, TripState } from './trip/trip.reducer';

export interface AppState {
  trip: TripState;
}

export const reducers: ActionReducerMap<AppState> = {
  trip: tripReducer
};
