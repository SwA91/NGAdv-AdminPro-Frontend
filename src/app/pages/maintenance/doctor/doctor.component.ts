import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { Subject, delay, takeUntil } from 'rxjs';
import { TypeTable } from 'src/app/enum/shared.enum';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeComponent } from 'src/app/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent extends UnsubscribeComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public typeHospitals = TypeTable.HOSPITALS;
  public typeDoctors = TypeTable.DOCTORS;

  public hospitalSelect: Hospital;
  public doctorSelect: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { super() }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      takeUntil(this.componentIsDestroyed$),
    ).subscribe(({ id }) => {
      this.getDoctor(id);
    });

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.loadHospitals();

    this.doctorForm.get('hospital').valueChanges.pipe(
      takeUntil(this.componentIsDestroyed$),
    ).subscribe((id) => {
      this.hospitalSelect = this.hospitals.find(h => h._id === id);
    });
  }

  getDoctor(id: string) {

    if (id === 'new') return;

    this.doctorService.getDoctorById(id).pipe(
      takeUntil(this.componentIsDestroyed$),
      delay(100),
    ).subscribe({
      next: (resp) => {
        const { name, hospital: { _id } } = resp.result;
        this.doctorSelect = resp.result as Doctor;
        // filled the form
        this.doctorForm.setValue({
          name, hospital: _id
        });
      },
      error: () => {
        // navigate to list doctors
        this.router.navigateByUrl(`/dashboard/doctors`)
      },
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().pipe(
      takeUntil(this.componentIsDestroyed$),
    )
      .subscribe((resp) => {
        this.hospitals = resp.result as Hospital[];
      });
  }

  saveEntity() {

    const { name } = this.doctorForm.value;

    if (this.doctorSelect) {

      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelect._id
      }
      this.doctorService.updateDoctor(data).pipe(
        takeUntil(this.componentIsDestroyed$),
      ).subscribe((resp) => {
        Swal.fire('Updated!', `'${name}' has been successfully updated`, 'success');
      });
    } else {

      this.doctorService.createDoctor(this.doctorForm.value).pipe(
        takeUntil(this.componentIsDestroyed$),
      ).subscribe((resp) => {
        Swal.fire('Created!', `'${name}' has been successfully created`, 'success');
        this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`)
      });
    }
  }

}
