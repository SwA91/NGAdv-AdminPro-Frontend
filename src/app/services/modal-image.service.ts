import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;

  constructor() { }

  closeModal() {
    this._hideModal = true;
  }

  openModal() {
    this._hideModal = false;
  }

  get hideModal() {
    return this._hideModal;
  }
}
