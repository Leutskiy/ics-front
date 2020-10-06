import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from '../settings/app-config';

@Injectable()
export class AuthService {

  authSessionKey: string = "auth";
  userSessionKey: string = "user";

  accountDetailService: string;
  authorizationService: string;

  profileId$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  employeeId$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  expiresAt: number;
  authenticated: boolean;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: HttpClient) {
      this.authorizationService = `${this.config.icsApiEndpoint}token`;
      this.accountDetailService = `${this.config.icsApiEndpoint}api/account/details`;

      this._initAuthData();
      this._initUserData();
  }

  public login(login: string, password: string): Observable<any> {

    let queryParams = `grant_type=${this.config.authGrantType}&username=${login}&password=${password}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers: headers };

    var profileEmployeeInfo = this.http.post(this.authorizationService, queryParams, options)
      .pipe(mergeMap(authData => {
        this._initAuthData(authData);
        return this.http.get(this.accountDetailService).pipe(map(profileEmployeeResult => {
          this._initUserData(profileEmployeeResult);
          return profileEmployeeResult;
        }));
      }));

    return profileEmployeeInfo;
  }

  public logout() {
    this.expiresAt = 0;
    this.authenticated = false;

    localStorage.removeItem(this.authSessionKey);
  }

  private _initAuthData(authData: any = null): void {
    if (authData) {
      this.expiresAt = authData.expires_in * 1000 + Date.now();
      this.authenticated = !!authData;

      localStorage.setItem(this.authSessionKey, JSON.stringify({
        accessToken: authData.access_token,
        expiresAt: this.expiresAt
      }));
    }
    else {
      let authDataAsString = localStorage.getItem(this.authSessionKey);
      let authDataFromStorage = JSON.parse(authDataAsString);

      if (authDataFromStorage) {
        this.expiresAt = authDataFromStorage.expiresAt;
        this.authenticated = !!authDataFromStorage;
      }
    }
  }

  private _initUserData(profileEmployeeData: any = null): void {
    if (profileEmployeeData) {
      let profileId = profileEmployeeData.profileId;
      let employeeId = profileEmployeeData.employeeId;

      localStorage.setItem(this.userSessionKey, JSON.stringify({
        profileId: profileId,
        employeeId: employeeId,
      }));

      this.profileId$.next(profileId);
      this.employeeId$.next(employeeId);
    }
    else {
      let profileEmployeeDataAsString = localStorage.getItem(this.userSessionKey);
      let profileEmployeeDataFromStorage = JSON.parse(profileEmployeeDataAsString);

      if (profileEmployeeDataFromStorage) {
        this.profileId$.next(profileEmployeeDataFromStorage.profileId);
        this.employeeId$.next(profileEmployeeDataFromStorage.employeeId);
      }
    }
  }

  public getToken(): string {
    let access_token = null;
    let authDataAsString = localStorage.getItem(this.authSessionKey);
    let authData = JSON.parse(authDataAsString);

    if (authData) {
      access_token = authData.accessToken;
    }

    return access_token;
  }

  public get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  }

  public get profileId(): Observable<string> {
    return this.profileId$.asObservable();
  }

  public get employeeId(): Observable<string> {
    return this.employeeId$.asObservable();
  }
}
