import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const toastService = inject(ToastrService);
  const router = inject(Router);
  if(authService.isAuthenticated()){
    return true
  }

  toastService.error('Requiere iniciar sesion');
  router.navigate([''])
  return false;

};
