import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeAPI, TypeHeader, TypeParamsQS, TypeTable } from '../enum/shared.enum';
import { environment } from 'src/environments/environment';
import { IAllCollectionResponse } from '../interfaces/api.interface';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(type: TypeTable, term: string = '') {
    const url = `${base_url}/${TypeAPI.ALL}/${TypeAPI.COLLECTION}/${type}/${term}`;

    return this.http.get<IAllCollectionResponse>(url, this.headers)
      .pipe(
        map(resp => {
          switch (type) {
            case TypeTable.USERS:
              resp.result = this.parseUser(resp.result);              
              break;          
            default:
              break;
          }
          return resp;
        })
      );
  }

  private parseUser(users: any[]): User[] {
    return users.map((user => new User(user.name, user.email, null, user.img, user.google, user.role, user.uid)));
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    const headers = {};
    headers[TypeHeader.TOKEN] = this.token;
    return { headers };
  }

}
