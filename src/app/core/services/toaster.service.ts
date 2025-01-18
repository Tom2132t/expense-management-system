import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toastContainer: HTMLElement;

  constructor() {
    this._toastContainer = this._getOrCreateToastContainer();
  }

  /**
   * Show a toast notification.
   * @param type Type of the toast ('info', 'success', 'error', 'warning').
   * @param message Message to display.
   * @param duration Duration in milliseconds (default: 3000ms).
   */
  showToast(
    type: 'info' | 'success' | 'error' | 'warning',
    message: string,
    duration = 3000
  ): void {
    const toastElement = this._createToastElement(type, message);

    // Append toast to container
    this._toastContainer.appendChild(toastElement);

    // Auto-remove toast after duration
    this._scheduleToastRemoval(toastElement, duration);
  }

  /**
   * Get or create the toast container element.
   */
  private _getOrCreateToastContainer(): HTMLElement {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-top toast-end';
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Create a toast element.
   * @param type Type of the toast.
   * @param message Message to display.
   */
  private _createToastElement(
    type: 'info' | 'success' | 'error' | 'warning',
    message: string
  ): HTMLElement {
    const toastElement = document.createElement('div');
    toastElement.className = `alert alert-${type}`;
    toastElement.innerHTML = `<span>${message}</span>`;
    return toastElement;
  }

  /**
   * Schedule removal of a toast element after a specific duration.
   * @param toastElement Toast element to remove.
   * @param duration Duration in milliseconds.
   */
  private _scheduleToastRemoval(
    toastElement: HTMLElement,
    duration: number
  ): void {
    setTimeout(() => {
      if (this._toastContainer.contains(toastElement)) {
        this._toastContainer.removeChild(toastElement);
      }
    }, duration);
  }
}
