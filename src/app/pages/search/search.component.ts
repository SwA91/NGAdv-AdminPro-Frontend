import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TypeTable } from 'src/app/enum/shared.enum';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { UnsubscribeComponent } from 'src/app/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent extends UnsubscribeComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];
  public typeUser = TypeTable.USERS;
  public typeDoctor = TypeTable.DOCTORS;
  public typeHospital = TypeTable.HOSPITALS;

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) { super() }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.componentIsDestroyed$),
    ).subscribe(({ term }) => {
      this.searchGlobal(term);
    });
  }

  searchGlobal(term: string) {
    this.searchService.searchGlobal(term).pipe(
      takeUntil(this.componentIsDestroyed$),
    ).subscribe((resp) => {
      this.users = resp.users;
      this.hospitals = resp.hospitals;
      this.doctors = resp.doctors;
    });
  }
}
