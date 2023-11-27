import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, delay, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs';
import { TypeTable } from 'src/app/enum/shared.enum';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UnsubscribeComponent } from 'src/app/shared/unsubscribe/unsubscribe.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent extends UnsubscribeComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public typeHospital: TypeTable = TypeTable.HOSPITALS;
  public search$ = new Subject<string>();

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchService,
  ) { super() }

  ngOnInit(): void {

    this.loadHospitals();

    this.modalImageService.newImage.pipe(
      takeUntil(this.componentIsDestroyed$),
      delay(100)
    ).subscribe(() => this.loadHospitals());

    this.loadSearches();
  }

  loadSearches() {
    this.search$.pipe(
      takeUntil(this.componentIsDestroyed$),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      debounceTime(500),
      switchMap((term: string) => {
        if (term) {
          return this.searchService.search(TypeTable.HOSPITALS, term)
        } else {
          return this.hospitalService.loadHospitals();
        }
      }),
      delay(1500),
    ).subscribe({
      next: (resp) => {
        this.loading = false;
        this.hospitals = resp.result as Hospital[];
      },
      error: (err) => { console.log('error', err); },
    });
  }

  openModalUpdateImage(hospital: Hospital) {
    this.modalImageService.openModal(TypeTable.HOSPITALS, hospital._id, hospital.img);
  }

  async openModalNewEntity() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Type new name hospital',
      input: "text",
      inputPlaceholder: "Name hospital",
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).pipe(
        takeUntil(this.componentIsDestroyed$),
      ).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      })
    }
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.removeHospital(hospital._id).pipe(
      takeUntil(this.componentIsDestroyed$),
    ).subscribe(resp => {
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    })
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).pipe(
      takeUntil(this.componentIsDestroyed$),
    ).subscribe(resp => {
      this.loadHospitals();
      Swal.fire('Update', hospital.name, 'success');
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().pipe(
      takeUntil(this.componentIsDestroyed$),
      tap(() => this.loading = true),
      delay(1500),
    ).subscribe({
      next: (resp) => this.hospitals = resp.result as Hospital[],
      error: (err) => console.log('error', err),
      complete: () => this.loading = false
    });
  }
}
