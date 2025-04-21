// import { CanActivateFn } from '@angular/router';

// export const roleGuard: CanActivateFn = (route, state) => {
//   return true;
// };



import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const userRole = localStorage.getItem('role'); // Check value here

    // Check for token expiry
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/welcomepage']);
      return false;
    }


    if (userRole && expectedRoles.includes(userRole)) {
      // console.log('✅ Role matched. Allowing access.');
      return true;
    }

    console.warn('⛔ Role mismatch or missing. Redirecting to /unauthorized');
    this.router.navigate(['/unauthorized']);
    return false;
  }



}
