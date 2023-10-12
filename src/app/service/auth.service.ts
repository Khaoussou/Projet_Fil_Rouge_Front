import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements HttpInterceptor {
  constructor() {
    this.user = this.getRole();
  }
  public token: string = '';
  public user!: User;
  getItem() {
    const userConnectData = localStorage.getItem('user');
    const userConnect = JSON.parse(userConnectData!);
    return userConnect.token;
  }
  getRole() {
    const userConnectData = localStorage.getItem('user');
    return JSON.parse(userConnectData!);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('user');
    const connect = JSON.parse(user!);
    if (user && connect.token) {
      this.token = connect.token;
    }
    console.log(this.token);

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return next.handle(authReq);
  }
}
