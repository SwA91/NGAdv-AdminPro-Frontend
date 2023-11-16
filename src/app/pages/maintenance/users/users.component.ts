import { Component, OnInit } from '@angular/core';
import { TypeTable } from 'src/app/enum/shared.enum';
import { IGetUsersResponse } from 'src/app/interfaces/api.interface';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  search(term: string) {
    // TODO: revisar el curso de RXJS sobre busquedas
    if (term.length === 0) {
      this.totalUsers = this.usersTemp.length;
      this.users = this.usersTemp;
    } else {
      this.searchService.search(TypeTable.USERS, term)
        .subscribe({
          next: (resp) => {
            this.users = resp.result;
            this.totalUsers = this.users.length;
          },
          error: (err) => console.log('error', err)
        });
    }
  }

  loadUsers() {
    this.loading = true;

    this.userService.loadUsers(this.from)
      .subscribe({
        next: (resp) => {
          this.totalUsers = resp.total;
          this.users = resp.users;
          this.usersTemp = resp.users;
        },
        error: (err) => { console.log('error', err) },
        complete: () => { this.loading = false; }
      });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.loadUsers();
  }
}
