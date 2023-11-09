import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  return userService.validateToken().pipe(
    tap(isAuth => {
      if (!isAuth) {
        router.navigateByUrl('/login');
      }
    })
  );
};
