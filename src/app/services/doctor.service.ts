import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeAPI, TypeHeader } from '../enum/shared.enum';
import { INewDoctorResponse, IListResultResponse, IOneResultResponse } from '../interfaces/api.interface';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient,
  ) { }

  getDoctorById(id: string) {

    const url = `${base_url}/${TypeAPI.DOCTORS}/${id}`;

    return this.http.get<IOneResultResponse>(url, this.headers);
  }

  loadDoctors() {

    const url = `${base_url}/${TypeAPI.DOCTORS}`;

    return this.http.get<IListResultResponse>(url, this.headers);
  }

  createDoctor(doctor: { name: string, hospital: string }) {

    const url = `${base_url}/${TypeAPI.DOCTORS}`;

    return this.http.post<INewDoctorResponse>(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {

    const url = `${base_url}/${TypeAPI.DOCTORS}/${doctor._id}`;

    return this.http.put(url, doctor, this.headers);
  }

  removeDoctor(id: string) {

    const url = `${base_url}/${TypeAPI.DOCTORS}/${id}`;

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
