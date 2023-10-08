import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CourClasse } from 'src/app/model/cour';
import { Salle } from 'src/app/model/salle';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-planification-session',
  templateUrl: './planification-session.component.html',
  styleUrls: ['./planification-session.component.css'],
})
export class PlanificationSessionComponent implements OnInit {
  public classes: CourClasse[] = [];
  public nbrHeure: number = 0;
  public prof: string = '';
  public salles: Salle[] = [];
  public salleDispo: string = '';
  public profDispo: string = '';
  public sessionDispo: string = '';
  public profId: number = 0;
  public courId: number = 0;
  public succes: string = '';
  public classeChoisies: number[] = [];

  ngOnInit(): void {
    this.all();
  }

  constructor(private fb: FormBuilder, private sessionService: SessionService) {
    this.classes = [];
    if (localStorage.getItem('cour') && localStorage.getItem('idCour')) {
      const courJson = localStorage.getItem('cour');
      const cours = JSON.parse(courJson!);
      this.classes = cours;
      const id: string = localStorage.getItem('idCour') as string;
      this.courId = +id;
      this.nbrHeure = this.classes[0].nbr_heure_restant as number;
      this.prof = this.classes[0].professeur as string;
      this.profId = this.classes[0].professeur_id as number;
    }
  }

  form = this.fb.group({
    date: ['', Validators.required],
    hd: [0, Validators.required],
    hf: [0, Validators.required],
    salle: [0, Validators.required],
    courClasses: [[], Validators.required],
  });

  all() {
    this.sessionService.getAll().subscribe((response) => {
      if ('salles' in response.data) {
        this.salles = response.data.salles as Salle[];
      }
    });
  }

  onSubmit() {
    this.form.value.courClasses = this.classeChoisies as any;
    this.sessionService.add(this.form.value).subscribe((response) => {
      this.succes = response.message;
    });
    this.form.reset();
  }

  choixClasse(event: CourClasse[]) {
    const classes: CourClasse[] = event as CourClasse[];
    this.classeChoisies = classes.map((classe) => classe.cours_classe_id);
    this.form.value.courClasses = this.classeChoisies as any;
    this.sessionService.salleDispo(this.form.value).subscribe((response) => {
      if (response.message == 'La salle est disponible !') {
        this.salleDispo = '';
      } else {
        this.salleDispo = response.message;
      }
    });
  }

  choixSalle() {
    this.form.value.courClasses = this.classeChoisies as any;
    this.sessionService.salleDispo(this.form.value).subscribe((response) => {
      if (response.message == 'La salle est disponible !') {
        this.salleDispo = '';
      } else {
        this.salleDispo = response.message;
      }
    });
  }

  choixProf() {
    this.sessionService
      .profDispo(this.profId, this.form.value)
      .subscribe((response) => {
        if (response.message == 'Ce prof est disponible !') {
          this.profDispo = '';
        } else {
          this.profDispo = response.message;
        }
      });
    this.sessionService
      .sessionDispo(this.courId, this.form.value)
      .subscribe((response) => {
        if (response.message == 'Vous pouvez programmer cette session !') {
          this.sessionDispo = '';
        } else {
          this.sessionDispo = response.message;
        }
      });
  }
}