import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { TypeTable } from '../enum/shared.enum';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private userService: UserService
  ) { }

  async updatePhoto(
    file: File,
    type: TypeTable,
    id: string) {

    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);
      const resp = await fetch(
        url,
        {
          method: 'PUT',
          headers: {
            'x-token': this.userService.token
          },
          body: formData
        },
      );

      const data = await resp.json();
      return true;

    } catch (error) {
      console.log('updatePhoto > error: ', error);
      return false;
    }
  }
}
