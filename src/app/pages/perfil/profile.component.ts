import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeTable } from 'src/app/enum/shared.enum';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { IGenericResponse } from '../../interfaces/api.interface';

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
  public imgTemp: string = null;

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
      .then((img: string) => {
        this.user.img = img;
        Swal.fire('Save', 'Image updated', 'success');
      })
      .catch((err: IGenericResponse) => {
        Swal.fire('Error', err.msg, 'error');
      });;
  }

  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) return this.imgTemp = null;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    }
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: () => {
          const { name, email } = this.profileForm.value;
          // for reference, all data is update
          this.user.name = name;
          this.user.email = email;
          Swal.fire('Save', 'Changes were save', 'success');
        },
        error: (error: IGenericResponse) => {
          Swal.fire('Error', error.msg, 'error');
        }
      });
  }
}
