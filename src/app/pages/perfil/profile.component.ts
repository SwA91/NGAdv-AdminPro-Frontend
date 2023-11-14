import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeTable } from 'src/app/enum/shared.enum';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;

  constructor(
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    });
  }

  uploadImage() {
    this.fileUploadService
      .updatePhoto(this.imageToUpload, TypeTable.USERS, this.user.uid)
      .then(img => console.log(img));
  }

  changeImage(file: File) {
    this.imageToUpload = file;
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: (resp) => {
          const { name, email } = this.profileForm.value;
          // for reference, all data is update
          this.user.name = name;
          this.user.email = email;
        },
        error: (err) => console.log(err)
      });
  }
}
