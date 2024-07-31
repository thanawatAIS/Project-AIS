import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user && user.role === 'admin') {
    // User is an admin
    return true;
  } else {
    // User is not an admin or not logged in
    if (!user || !user.role) {
      router.navigate(['/login']);
    } else {
      router.navigate(['/home']);
    }
    return false;
  }
};
