import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeAPI, TypeHeader } from '../enum/shared.enum';
import { IGetHospitalsResponse } from '../interfaces/api.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  loadHospitals() {

    const url = `${base_url}/${TypeAPI.HOSPITALS}`;

    return this.http.get<IGetHospitalsResponse>(url, this.headers);
  }

  createHospital(name: string) {

    const url = `${base_url}/${TypeAPI.HOSPITALS}`;

    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(id: string, name: string) {

    const url = `${base_url}/${TypeAPI.HOSPITALS}/${id}`;

    return this.http.put(url, { name }, this.headers);
  }

  removeHospital(id: string) {

    const url = `${base_url}/${TypeAPI.HOSPITALS}/${id}`;

    return this.http.delete(url, this.headers);
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
