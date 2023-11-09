import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn')
  googleBtn: ElementRef;

  public loginForm = this.fb.group(
    {
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      remember: [false]
    },
  );

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    // build google init
    this.googleInit();
  }

  ngOnInit(): void {
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "428958341715-vd5v3i33lfi4uq6mb2kjvhaerd6omt0h.apps.googleusercontent.com",
      // keep the instance this LoginComponent
      callback: (resp: unknown) => this.handleCredentialResponse(resp)
    });
    google.accounts.id.renderButton(
      // document.getElementById("googleBtn"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(resp: any) {
    this.userService.loginGoogle(resp.credential).subscribe({
      next: (resp) => {
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
