import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Cour, CourClasse } from '../model/cour';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { Eleve } from '../model/eleve';

@Injectable({
  providedIn: 'root',
})
export class CoursService extends ServiceMereService<Cour> {
  protected override Uri: string = 'cours';
  getProf(id: number): Observable<Response<Cour>> {
    return this.http.get<Response<Cour>>(this.url + 'prof/' + id);
  }

  getClasse(id: number): Observable<Response<CourClasse>> {
    return this.http.get<Response<CourClasse>>(this.url + 'classe/' + id);
  }

  getCourProf(id: number): Observable<Response<Cour>> {
    return this.http.get<Response<Cour>>(this.url + 'courProf/' + id);
  }

  getClasseCours(id: number): Observable<Response<Eleve>> {
    return this.http.get<Response<Eleve>>(this.url + 'cours/student/' + id);
  }
}
