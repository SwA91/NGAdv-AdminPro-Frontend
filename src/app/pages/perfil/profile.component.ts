import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('User-X', Validators.required),
      email: new FormControl('user.X@user.com', [Validators.required, Validators.email]),
    });
  }
  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: (resp) => console.log(resp),
        error: (err) => console.log(err)
      });
  }
}
