import { Component, OnInit } from '@angular/core';
import { TypeTable } from 'src/app/enum/shared.enum';
import { IGenericResponse } from 'src/app/interfaces/api.interface';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
    private modalImageService: ModalImageService,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  openModal(user: User) {
    this.modalImageService.openModal();
  }

  changeRole(user: User) {
    this.userService.saveProfile(user)
      .subscribe({
        error: (error: IGenericResponse) => {
          Swal.fire('Error', error.msg, 'error');
        }
      });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cannot erase itself",
      });
    } else {

      Swal.fire({
        title: "Are you sure?",
        text: `Is about to erase '${user.name}'`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user)
            .subscribe({
              next: (resp) => {

                Swal.fire({
                  title: 'User deleted',
                  text: `${user.name} has been eliminated`,
                  icon: 'success'
                });

                this.loadUsers();
              },
              error: (err) => console.log('deleteUser', err)
            });
        }
      });
    }
  }

  search(term: string) {
    // TODO: revisar el curso de RXJS sobre busquedas repetitivas
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
