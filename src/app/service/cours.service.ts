import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Cour } from '../model/cour';
import { Observable } from 'rxjs';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class CoursService extends ServiceMereService<Cour> {
  protected override Uri: string = 'cours';
  getProf(id: number): Observable<Response<Cour>> {
    return this.http.get<Response<Cour>>(this.url + 'prof/' + id);
  }
}
