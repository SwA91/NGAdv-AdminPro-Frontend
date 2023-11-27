import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormInterface } from 'src/app/interfaces/login-form.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn')
  public googleBtn: ElementRef;
  public auth2: any;
  public loginForm = this.fb.group(
    {
      email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    },
  );

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    // build google init
    this.googleInit();
  }

  googleInit() {
    this.userService.initGoogle(this.handleCredentialResponse.bind(this));
    this.userService.buttonGoogle(this.googleBtn);
  }

  handleCredentialResponse(resp: any) {
    this.userService.loginGoogle(resp.credential).subscribe({
      next: (resp) => {
        // navigate to dashboard
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      },
      error: (err) => {
        // launch error
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  loginUser() {
    this.userService.loginUser(this.loginForm.value as LoginFormInterface)
      .subscribe({
        next: (resp) => {
          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }
          // navigate to dashboard
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          // launch error
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      });
  }

}
