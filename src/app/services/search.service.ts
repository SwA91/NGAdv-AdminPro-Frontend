import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeAPI, TypeHeader, TypeTable } from '../enum/shared.enum';
import { IListResultResponse, ISearchGlobalResponse } from '../interfaces/api.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  searchGlobal(term: string) {

    const url = `${base_url}/${TypeAPI.ALL}/${term}`;

    return this.http.get<ISearchGlobalResponse>(url, this.headers);
  }

  search(type: TypeTable, term: string = '') {

    const url = `${base_url}/${TypeAPI.ALL}/${TypeAPI.COLLECTION}/${type}/${term}`;

    return this.http.get<IListResultResponse>(url, this.headers)
      .pipe(
        map(resp => {
          switch (type) {
            case TypeTable.USERS:
              // parse only for the class User
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
