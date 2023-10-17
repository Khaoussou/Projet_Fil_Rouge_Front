import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ConnexionService } from 'src/app/service/connexion.service';

@Component({
  selector: 'app-nav-barr',
  templateUrl: './nav-barr.component.html',
  styleUrls: ['./nav-barr.component.css'],
})
export class NavBarrComponent {
  constructor(
    private connexionService: ConnexionService,
    private route: Router
  ) {}

  logout() {
    this.connexionService.logout().subscribe((response) => {
      localStorage.removeItem('user');
      localStorage.clear();
      console.log(response);
    });
    this.route.navigateByUrl('');
  }
}
