import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private http: HttpClient
  ) { }

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

    google.accounts.id.revoke('willyarrojas@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

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
    console.log('loginGoogle', token);

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
