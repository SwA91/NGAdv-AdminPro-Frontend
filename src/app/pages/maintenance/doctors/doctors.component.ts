import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, delay, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs';
import { TypeTable } from 'src/app/enum/shared.enum';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UnsubscribeComponent } from 'src/app/shared/unsubscribe/unsubscribe.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent extends UnsubscribeComponent implements OnInit {

  public doctors: Doctor[] = [];
  public loading: boolean = true;
  public typeDoctor: TypeTable = TypeTable.DOCTORS;
  public search$ = new Subject<string>();

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchService: SearchService,
  ) { super() }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSearches();

    this.modalImageService.newImage.pipe(
      takeUntil(this.componentIsDestroyed$),
      delay(100)
    ).subscribe(() => this.loadDoctors());
  }

  loadSearches() {
    this.search$.pipe(
      takeUntil(this.componentIsDestroyed$),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      debounceTime(500),
      switchMap((term: string) => {
        if (term) {
          return this.searchService.search(TypeTable.DOCTORS, term)
        } else {
          return this.doctorService.loadDoctors();
        }
      }),
      delay(1500),
    ).subscribe({
      next: (resp) => {
        this.loading = false;
        this.doctors = resp.result as Doctor[];
      },
      error: (err) => { console.log('error', err); },
    });
  }

  deleteHospital(doctor: Doctor) {
    Swal.fire({
      title: "Are you sure?",
      text: `Is about to erase '${doctor.name}'`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.removeDoctor(doctor._id)
          .subscribe({
            next: (resp) => {
              this.loadDoctors();

              Swal.fire({
                title: 'Deleted!',
                text: `${doctor.name} has been eliminated`,
                icon: 'success'
              });

            },
            error: (err) => console.log('deleteUser', err)
          });
      }
    });
    // this.hospitalService.removeHospital(hospital._id).pipe(
    //   takeUntil(this.componentIsDestroyed$),
    // ).subscribe(resp => {
    //   this.loadHospitals();
    //   Swal.fire('Deleted', hospital.name, 'success');
    // })
  }

  saveChanges(doctor: Doctor) {
    // this.hospitalService.updateHospital(hospital._id, hospital.name).pipe(
    //   takeUntil(this.componentIsDestroyed$),
    // ).subscribe(resp => {
    //   this.loadHospitals();
    //   Swal.fire('Update', hospital.name, 'success');
    // });
  }

  loadDoctors() {
    this.doctorService.loadDoctors().pipe(
      takeUntil(this.componentIsDestroyed$),
      tap(() => this.loading = true),
      delay(1500),
    ).subscribe({
      next: (resp) => this.doctors = resp.result as Doctor[],
      error: (err) => console.log('error', err),
      complete: () => this.loading = false
    });
  }

  openModalUpdateImage(doctor: Doctor) {
    this.modalImageService.openModal(TypeTable.DOCTORS, doctor._id, doctor.img);
  }
}
