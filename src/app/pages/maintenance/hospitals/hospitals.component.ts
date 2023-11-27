import { Component, OnInit } from '@angular/core';
import { delay, takeUntil } from 'rxjs';
import { TypeTable } from 'src/app/enum/shared.enum';
import { Hospital } from 'src/app/models/hospital.mode';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
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

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
  ) { super() }

  ngOnInit(): void {

    this.loadHospitals();

    this.modalImageService.newImage.pipe(
      takeUntil(this.componentIsDestroyed$),
      delay(100)
    ).subscribe(() => this.loadHospitals());
  }

  openModalUpdateImageHospital(hospital: Hospital) {
    this.modalImageService.openModal(TypeTable.HOSPITALS, hospital._id, hospital.img);
  }

  async openModalNewHospital() {
    const { value } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Type new name hospital',
      input: "text",
      inputPlaceholder: "Name hospital",
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      })
    }
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.removeHospital(hospital._id).subscribe(resp => {
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    })
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe(resp => {
      this.loadHospitals();
      Swal.fire('Update', hospital.name, 'success');
    });
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe({
      next: (resp) => {

        this.hospitals = resp.hospitals;
      },
      error: (err) => { console.log('error', err); },
      complete: () => this.loading = false
    });
  }
}
