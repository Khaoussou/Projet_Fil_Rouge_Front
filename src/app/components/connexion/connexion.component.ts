import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ConnexionService } from 'src/app/service/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  public form!: FormGroup;
  public user!: User;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private connexionService: ConnexionService,
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.connexionService.login(this.form.value).subscribe((response) => {
      if ('token' in response) {
        localStorage.setItem('user', JSON.stringify(response));
        const userConnectData = localStorage.getItem('user');
        this.user = JSON.parse(userConnectData!);
        if (this.user.role == 'RP') {
          this.route.navigateByUrl('/addCours');
        } else if (this.user.role == 'Prof') {
          this.route.navigateByUrl('/courProf');
        } else if (this.user.role == 'Attache') {
          this.route.navigateByUrl('/listeSession');
        } else {
          this.route.navigateByUrl('/updatePassWord');
        }
      } else {
        this.route.navigateByUrl('');
        localStorage.removeItem('user');
        localStorage.clear();
      }
    });
  }
}
