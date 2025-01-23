import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import * as TripActions from '../../store/trip/trip.actions';

export enum CommunicationActions {
  LOGOUT = 'logout',
  RELOAD_TRIPS = 'reloadTrips',
  DELETE_TRIP = 'deleteTrip'
}

interface BroadcastMessage {
  action: CommunicationActions;
  payload?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService implements OnDestroy {
  private channel: BroadcastChannel;
  private readonly channelName = 'trip-sync-channel';

  constructor(
    private _store: Store,
    private _router: Router,
    private _authService: AuthService,
    private _ngZone: NgZone
  ) {
    this.channel = new BroadcastChannel(this.channelName);

    // Listen for incoming messages
    this.channel.onmessage = (message) => {
      this._ngZone.run(() =>
        this._handleMessage(message.data as BroadcastMessage)
      );
    };
  }

  /**
   * Sends a message to all open tabs/windows.
   * @param action The action to perform (e.g., logout, reloadTrips).
   * @param payload Optional data associated with the action.
   */
  sendMessage(action: CommunicationActions, payload?: any): void {
    if (!action) {
      console.error('sendMessage: action is required');
      return;
    }
    const message: BroadcastMessage = { action, payload };
    this.channel.postMessage(message);
  }

  /**
   * Handles incoming messages and routes them to the appropriate logic.
   * @param message The received broadcast message.
   */
  private _handleMessage(message: BroadcastMessage): void {
    if (!message || !message.action) {
      console.warn('Received an invalid message:', message);
      return;
    }

    const actionHandlers: Record<CommunicationActions, () => void> = {
      [CommunicationActions.LOGOUT]: () => this._handleLogout(),
      [CommunicationActions.RELOAD_TRIPS]: () => this._handleReloadTrips(),
      [CommunicationActions.DELETE_TRIP]: () => this._handleDeleteTrip()
    };

    const handler = actionHandlers[message.action];
    if (handler) {
      handler();
    } else {
      console.warn(`Unhandled action: ${message.action}`, message.payload);
    }
  }

  /**
   * Handles the logout action.
   */
  private _handleLogout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  /**
   * Handles the reload trips action.
   */
  private _handleReloadTrips(): void {
    // Dispatch the NgRx action to reload trips
    this._store.dispatch(TripActions.loadTrips());
  }

  /**
   * Handles the reload trips action.
   */
  private _handleDeleteTrip(): void {
    // Dispatch the NgRx action to delete trip and navigate to list
    this._store.dispatch(TripActions.loadTrips());
    this._router.navigate(['/trip/list']);
  }

  /**
   * Cleans up resources when the service is destroyed.
   */
  ngOnDestroy(): void {
    this.channel.close();
  }
}
