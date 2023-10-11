import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Inscription } from '../model/inscription';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService extends ServiceMereService<Inscription> {
  protected override Uri: string = 'inscriptions';
}
