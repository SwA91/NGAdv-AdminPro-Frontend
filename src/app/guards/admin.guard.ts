import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { TypeRole } from '../enum/shared.enum';

export const adminGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.role === TypeRole.ADMIN_ROLE) {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};
