import { Component, OnInit } from '@angular/core';
import { TypeTable } from 'src/app/enum/shared.enum';
import { Hospital } from 'src/app/models/hospital.mode';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public typeHospital: TypeTable = TypeTable.HOSPITALS;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadUsers().subscribe({
      next: (resp) => {

        this.hospitals = resp.hospitals;
      },
      error: (err) => { console.log('error', err); },
      complete: () => this.loading = false
    });
  }
}
