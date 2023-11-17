import { Component } from '@angular/core';
import { IGenericResponse } from 'src/app/interfaces/api.interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  public imageToUpload: File;
  public imgTemp: string = null;

  constructor(
    private fileUploadService: FileUploadService,
    public modalImageService: ModalImageService
  ) { }

  uploadImage() {
    const { id, type } = this.modalImageService;

    this.fileUploadService
      .updatePhoto(this.imageToUpload, type, id)
      .then((img) => {
        Swal.fire('Save', 'Image updated', 'success');
        this.closeModal();
        this.modalImageService.newImage.emit(img);
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

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

}
