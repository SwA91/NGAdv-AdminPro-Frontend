import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

const validateToken = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.validateToken().pipe(
    tap(isAuth => {
      if (!isAuth) {
        router.navigateByUrl('/login');
      }
    })
  );
}

export const authGuardMatch: CanMatchFn = () => {
  return validateToken();
};

export const authGuard: CanActivateFn = (route, state) => {
  return validateToken();
};
