import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(
      `${base_url}/login/renew`,
      {
        headers: {
          'x-token': token
        }
      }
    ).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(err => of(false))
    );
  }

  loginGoogle(token: string) {
    return this.http.post(
      `${base_url}/login/google`,
      { token }
    ).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginUser(formData: LoginFormInterface) {
    return this.http.post(
      `${base_url}/login`,
      formData
    ).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(
      `${base_url}/users`,
      formData
    ).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }
}
