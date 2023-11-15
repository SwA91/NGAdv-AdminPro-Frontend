import { Component, OnInit } from '@angular/core';
import { IGetUsersResponse } from 'src/app/interfaces/api.interface';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.loadUsers(0)
      .subscribe({
        next: (resp) => {
          this.totalUsers = resp.total;
          this.users = resp.users;
        },
        error: (err) => { console.log('error', err) }
      });
  }
}
