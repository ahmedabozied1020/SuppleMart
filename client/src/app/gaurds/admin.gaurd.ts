import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { LoggedInUserService } from '../services/observables/logged-in-user/logged-in-user.service';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const adminGaurd: CanActivateChildFn = () => {
  const authService = inject(LoggedInUserService);
  const router = inject(Router);

  return authService.getLoggedInUser().pipe(
    map((user) => {
      if (user && user.role === 'admin') {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
