import { EventEmitter, Injectable } from '@angular/core';
import { TypeAPI, TypeTable } from '../enum/shared.enum';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public type: TypeTable;
  public id: string;
  public img: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  closeModal() {
    this._hideModal = true;
  }

  openModal(type: TypeTable, id: string, img: string = 'no-img') {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/${TypeAPI.UPLOADS}/${type}/${img}`;
    }
  }

  get hideModal() {
    return this._hideModal;
  }
}
