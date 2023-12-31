import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [true, Validators.required]
    },
    {
      validators: this.passwordsSame('password', 'password2')
    }
  );

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      // create user
      this.userService.createUser(this.registerForm.value)
        .subscribe(
          {
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
          }
        );
    }

  }

  fieldInvalid(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted;
  }

  agreeTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordInvalid(): any {
    return this.registerForm.get('password') !== this.registerForm.get('password2') && this.formSubmitted;
  }

  passwordsSame(passName1: string, passName2: string) {
    return (formGroup: FormGroup) => {
      const passControl1 = formGroup.get(passName1);
      const passControl2 = formGroup.get(passName2);

      if (passControl1.value === passControl2.value) {
        passControl2.setErrors(null);
      } else {
        // Add error field password2
        passControl2.setErrors({ notEqual: true });
      }
    };
  }

}
