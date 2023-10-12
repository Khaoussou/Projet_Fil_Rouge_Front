import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/service/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private connexionService: ConnexionService
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
        this.route.navigateByUrl('/addCours');
      } else {
        this.route.navigateByUrl('');
        localStorage.removeItem('user');
        localStorage.clear();
      }
    });
  }
}
