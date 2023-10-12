import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Inscription } from '../model/inscription';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { UpdatePassword } from '../model/update-password';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService extends ServiceMereService<Inscription> {
  protected override Uri: string = 'inscriptions';

  updatePassword(body: any): Observable<Response<UpdatePassword>> {
    return this.http.post<Response<UpdatePassword>>(
      this.url + 'updatePassword',
      body
    );
  }
}
