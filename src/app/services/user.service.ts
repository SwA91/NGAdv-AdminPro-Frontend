import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { TypeAPI, TypeHeader, TypeParamsQS, TypeRole } from '../enum/shared.enum';
import { IGenericResponse, IGetUsersResponse } from '../interfaces/api.interface';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private http: HttpClient
  ) { }

  deleteUser(user: User) {
    const url = `${base_url}/${TypeAPI.USERS}/${user.uid}`;

    return this.http.delete<IGenericResponse>(url, this.headers);
  }

  loadUsers(from: number = 0) {

    const url = `${base_url}/${TypeAPI.USERS}?${TypeParamsQS.FROM}=${from}`;

    return this.http.get<IGetUsersResponse>(url, this.headers)
      .pipe(
        // delay(2000), // delay several seconds for example
        map(resp => {
          resp.users = resp.users.map(user => new User(user.name, user.email, null, user.img, user.google, user.role, user.uid));
          return resp;
        })
      );
  }

  saveProfile(user: User) {

    return this.http.put(
      `${base_url}/${TypeAPI.USERS}/${user.uid}`,
      user,
      this.headers
    ).pipe(
      catchError(({ error }) => {
        return throwError(() => error);
      })
    );
  }

  updateProfile(data: { email: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.user.role
    };

    return this.http.put(
      `${base_url}/${TypeAPI.USERS}/${this.uid}`,
      data,
      this.headers
    ).pipe(
      catchError(({ error }) => {
        return throwError(() => error);
      })
    );
  }

  initGoogle(_callback) {
    google.accounts.id.initialize({
      client_id: "428958341715-vd5v3i33lfi4uq6mb2kjvhaerd6omt0h.apps.googleusercontent.com",
      callback: _callback
    });
  }

  buttonGoogle(button: ElementRef) {
    google.accounts.id.renderButton(
      // document.getElementById("googleBtn"), not must use this reference in angular
      button.nativeElement,
      { theme: 'outline', size: 'large' }
    );
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    const email = '';

    if (email) {
      google.accounts.id.revoke('', () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        })
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  validateToken(): Observable<boolean> {

    return this.http.get(
      `${base_url}/login/renew`,
      {
        headers: {
          'x-token': this.token
        }
      }
    ).pipe(
      map((resp: any) => {
        const { name, email, role, google, uid, img } = resp.user;
        this.user = new User(name, email, null, img, google, role, uid);
        this.saveLocalStorage(resp.token, resp.menu)
        return true;
      }),
      catchError(err => of(false))
    );
  }

  loginGoogle(token: string) {

    return this.http.post(
      `${base_url}/login/google`,
      { token }
    ).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu)
      })
    );
  }

  loginUser(formData: LoginFormInterface) {
    return this.http.post(
      `${base_url}/login`,
      formData
    ).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu)
      })
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(
      `${base_url}/users`,
      formData
    ).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu)
      })
    );
  }

  private saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  get role(): TypeRole {
    return this.user.role;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    const headers = {};
    headers[TypeHeader.TOKEN] = this.token;
    return { headers };
  }
}
