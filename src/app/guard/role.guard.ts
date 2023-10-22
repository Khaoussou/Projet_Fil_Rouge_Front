import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthorized = route.data['role'];

    console.log(isAuthorized);
    if (
      !isAuthorized.some((role: string) => this.authService.getRole() == role)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Vous ne pouvez pas acceder à cette resource !'
      });
      return false;
    }
    return true;
  }
}
