import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UnsubscribeComponent } from '../unsubscribe/unsubscribe.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent extends UnsubscribeComponent implements OnInit {

  public user: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    super();
    this.user = userService.user;
  }

  ngOnInit(): void { }

  search(term: string) {
    if (!term) return;
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }
  logout() {
    this.userService.logout();
  }

}
