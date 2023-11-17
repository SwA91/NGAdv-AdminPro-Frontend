import { Pipe, PipeTransform } from '@angular/core';
import { TypeAPI, TypeTable } from '../enum/shared.enum';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: TypeTable): string {

    let url = `${base_url}/${TypeAPI.UPLOADS}/${type}/no-image`;
    
    switch (true) {
      case img?.includes('https'):
        url = img;
        break;

      case !!img:
        url = `${base_url}/${TypeAPI.UPLOADS}/${type}/${img}`
        break;
      default:
        break;
    }

    return url;
  }

}
