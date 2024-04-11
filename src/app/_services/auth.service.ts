import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../_models/requests/register.request';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { TokenResponse } from '../_models/response/token.response';
import { LoginRequest } from '../_models/requests/login.request';
import { SetPasswordRequest } from '../_models/requests/set-password.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  tokenObserver = new BehaviorSubject<TokenResponse | null>(null);
  token$ = this.tokenObserver.asObservable();



  constructor(private httpClient: HttpClient) { }

  setToken(tokenResponse: TokenResponse) {
    let stringVal = JSON.stringify(tokenResponse);
    localStorage.setItem("token", stringVal);
    this.tokenObserver.next(tokenResponse);
  }
  removeToken() {
    localStorage.removeItem("token");
    this.tokenObserver.next(null);
  }

  getUserId() {
    return this.httpClient.get<string>(this.baseUrl + "users/get-id")
  }

  registerUser(userDetails: RegisterRequest) {
    return this.httpClient.post(this.baseUrl + "auth/register", userDetails);
  }
  loginUser(userDetails: LoginRequest) {
    return this.httpClient.post<TokenResponse>(this.baseUrl + "auth/login", userDetails).pipe(map(val => {
      if (val) {
        this.setToken(val);
      }
      return val;
    }))
  }



  setPassword(setPassword: SetPasswordRequest) {
    return this.httpClient.post<TokenResponse>(this.baseUrl + "auth/set-password", setPassword).pipe(map(val => {
      if (val) {
        this.setToken(val);
      }
      return val;
    }))
  }

  logOutUser() {
    this.removeToken();
  }
  intialiseToken() {
    let tokenObject = localStorage.getItem('token')
    if (tokenObject) {
      let tokenResponse: TokenResponse = JSON.parse(tokenObject);
      this.tokenObserver.next(tokenResponse);
    }
  }
}
