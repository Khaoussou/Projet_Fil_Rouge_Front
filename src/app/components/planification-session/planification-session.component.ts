import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CourClasse } from 'src/app/model/cour';
import { Salle } from 'src/app/model/salle';
import { Session } from 'src/app/model/session';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-planification-session',
  templateUrl: './planification-session.component.html',
  styleUrls: ['./planification-session.component.css'],
})
export class PlanificationSessionComponent implements OnInit {
  @ViewChild(NgSelectComponent) ngSelect!: ElementRef;

  public classes!: CourClasse[];
  public nbrHeure!: string;
  public prof!: string;
  public session: Session[] = [];
  public salles: Salle[] = [];
  public salleDispo: string = '';
  public profDispo: string = '';
  public sessionDispo: string = '';
  public profId!: number;
  public courId!: number;
  public succes: string = '';
  public form!: FormGroup;
  public classeChoisies: number[] = [];

  ngOnInit(): void {
    this.all();
    this.classes = [];
    const allCours = localStorage.getItem('cour');
    const id = localStorage.getItem('idCour');
    console.log(allCours);
    console.log(id);
    if (allCours && id) {
      const courJson = localStorage.getItem('cour');
      const cours = JSON.parse(courJson!);
      this.classes = cours;
      console.log(cours);
      
      const id: string = localStorage.getItem('idCour') as string;
      this.courId = +id;
      this.nbrHeure = this.classes[0].nbr_heure_restant + ':00';
      this.prof = this.classes[0].professeur as string;
      this.profId = this.classes[0].professeur_id as number;
    }
  }

  constructor(private fb: FormBuilder, private sessionService: SessionService) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      hd: [0, Validators.required],
      hf: [0, Validators.required],
      salle: [0, Validators.required],
      courClasses: [[], Validators.required],
    });
  }

  all() {
    this.sessionService.getAll().subscribe((response) => {
      if ('salles' in response.data) {
        this.salles = response.data.salles as Salle[];
      }
    });
  }

  onSubmit() {
    this.form.value.courClasses = this.classeChoisies as any;
    console.log(this.form.value);
    this.sessionService.add(this.form.value).subscribe((response) => {
      this.succes = response.message;
      if ('session' in response.data) {
        this.session = response.data.session as Session[];
        const hd: string = this.session[0].heure_debut as string;
        const hf: string = this.session[0].heure_fin as string;
        const time1 =
          parseInt(this.nbrHeure.split(':')[0]) * 60 +
          parseInt(this.nbrHeure.split(':')[1]);
        const time2 =
          parseInt(hd.split(':')[0]) * 60 + parseInt(hd.split(':')[1]);
        const time3 =
          parseInt(hf.split(':')[0]) * 60 + parseInt(hf.split(':')[1]);
        const differenceEnMinutes = time3 - time2;
        const nouveauTempsEnMinutes = time1 - differenceEnMinutes;
        const heures = Math.floor(nouveauTempsEnMinutes / 60);
        const minutes = nouveauTempsEnMinutes % 60;
        const nouveauTimeString =
          heures.toString().padStart(2, '0') +
          ':' +
          minutes.toString().padStart(2, '0');
        this.nbrHeure = nouveauTimeString;
      }
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

  choixProf(event: Event) {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    console.log(event);

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
