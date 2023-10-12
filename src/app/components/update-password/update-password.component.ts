import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { EtudiantService } from 'src/app/service/etudiant.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  public message: string = '';
  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService
  ) {}

  private errorMessage: any = {
    'email.required': "L'email est requis",
    'email.email': 'Veuilez donner un bon format !',
    'password.required': 'Le password est obligatoire',
    'password.minlength': 'Le password doit etre au minimum 5 caractéres',
    'confirmPassword.required': 'Ce champ est obligatoire !',
  };

  form = this.fb.group({
    username: ['', (Validators.required, Validators.email)],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  public getErrorsMessage(
    name: string,
    error: ValidationErrors
  ): string | undefined {
    return this.errorMessage[name + '.' + Object.keys(error)[0]];
  }

  onSubmit() {
    this.etudiantService
      .updatePassword(this.form.value)
      .subscribe((response) => {
        console.log(response.message);
        this.message = response.message;
      });
    console.log(this.form.value);
  }
}
