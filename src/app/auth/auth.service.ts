import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { ToastService } from '../core/services/toaster.service';

export const LOGGED_USER_TOKEN = 'blog:token';
export const LOGGED_USER = 'blog:user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _baseUrl: string = `api/users`;

  private _token: string | null =
    this._getFromLocalStorage<string>(LOGGED_USER_TOKEN);
  private _user: UserModel | null =
    this._getFromLocalStorage<UserModel>(LOGGED_USER);

  private _http = inject(HttpClient);
  private _toasterService = inject(ToastService);

  get token(): string | null {
    return this._token;
  }

  get user(): UserModel | null {
    return this._user;
  }

  get isLoggedIn(): boolean {
    return !!(this._token && this._user);
  }

  login(
    user: Pick<UserModel, 'name' | 'password'>
  ): Observable<UserModel | null> {
    return this._http
      .get<
        UserModel[]
      >(`${this._baseUrl}?name=${user.name}&password=${user.password}`)
      .pipe(
        map((users: UserModel[]) => (users.length ? users[0] : null)),
        tap((user: UserModel | null) => {
          if (user) {
            this._setUserSession(user);
          } else {
            this._toasterService.showToast('error', 'Wrong Details');
          }
        })
      );
  }

  logout(): void {
    this._clearUserSession();
  }

  private _setUserSession(userData: UserModel): void {
    this._token = userData.token;
    this._user = userData;
    this._setToLocalStorage(LOGGED_USER_TOKEN, this._token);
    this._setToLocalStorage(LOGGED_USER, this._user);
  }

  private _clearUserSession(): void {
    this._token = null;
    this._user = null;
    this._removeFromLocalStorage(LOGGED_USER_TOKEN);
    this._removeFromLocalStorage(LOGGED_USER);
  }

  private _getFromLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  private _setToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private _removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
