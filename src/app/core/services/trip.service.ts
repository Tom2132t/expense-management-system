import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripModel } from '../../shared/models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly _baseUrl = 'api/trips';

  private _http = inject(HttpClient);

  /**
   * Get all trips
   * @returns Observable<TripModel[]>
   */
  getTrips(): Observable<TripModel[]> {
    return this._http.get<TripModel[]>(this._baseUrl);
  }

  /**
   * Get a trip by ID
   * @param id Trip ID
   * @returns Observable<TripModel>
   */
  getTripById(id: string): Observable<TripModel> {
    return this._http.get<TripModel>(`${this._baseUrl}/${id}`);
  }

  /**
   * Create a new trip
   * @param trip Trip object
   * @returns Observable<TripModel>
   */
  createTrip(trip: TripModel): Observable<TripModel> {
    return this._http.post<TripModel>(this._baseUrl, trip);
  }

  /**
   * Update an existing trip
   * @param id Trip ID
   * @param updatedTrip Updated trip data
   * @returns Observable<TripModel>
   */
  updateTrip(id: string, updatedTrip: TripModel): Observable<TripModel> {
    return this._http.put<TripModel>(`${this._baseUrl}/${id}`, updatedTrip);
  }

  /**
   * Delete a trip by ID
   * @param id Trip ID
   * @returns Observable<void>
   */
  deleteTrip(id: string): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }
}
