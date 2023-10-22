import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ConnexionService } from '../service/connexion.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private login: ConnexionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.auth.getItem();
    if (token) {
      this.login.isConnect = true
      
      return true;
    } else {
      this.login.isConnect = false
      this.router.navigate(['']);
      return false;
    }
  }
}
