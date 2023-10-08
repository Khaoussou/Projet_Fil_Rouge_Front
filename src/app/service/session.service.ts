import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Observable } from 'rxjs';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends ServiceMereService<any> {
  protected override Uri: string = 'sessions';

  salleDispo(body: any): Observable<Response<any>> {
    return this.http.post<Response<any>>(this.url + 'salleDispo', body);
  }

  profDispo(profId: number, body: any): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      this.url + 'profDispo/' + profId,
      body
    );
  }

  sessionDispo(id: number, body: any): Observable<Response<any>> {
    return this.http.post<Response<any>>(this.url + 'sessionDispo/' + id, body);
  }
}