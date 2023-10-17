import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

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
      window.alert('Vous ne pouvez pas acceder à cette ressource !');
      return false;
    }
    return true;
  }
}
