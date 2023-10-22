import { Component } from '@angular/core';
import { ConnexionService } from './service/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Projet_Fil_Rouge';
  constructor(public connexionService: ConnexionService) {}
}
