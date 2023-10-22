import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { UpdatePassword } from '../model/update-password';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService extends ServiceMereService<UpdatePassword> {
  public isConnect: boolean = false;
  public token: string = '';
  login(body: any): Observable<Response<UpdatePassword>> {
    this.isConnect = true;
    return this.http.post<Response<UpdatePassword>>(this.url + 'login', body);
  }

  logout() {
    this.isConnect = false;
    const user = localStorage.getItem('user');
    const connect = JSON.parse(user!);
    this.token = connect.token;
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    return this.http.get(this.url + 'logout', { headers: headers });
  }
}
