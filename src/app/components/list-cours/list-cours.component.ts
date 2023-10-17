import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cour, CourClasse } from 'src/app/model/cour';
import { Eleve } from 'src/app/model/eleve';
import { Inscription } from 'src/app/model/inscription';
import { User } from 'src/app/model/user';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css'],
})
export class ListCoursComponent implements OnInit {
  public coursClasses: Cour[] = [];
  public showOneCours!: Cour;
  public showClasses: CourClasse[] = [];
  public heureGlobal: number = 0;
  public heureEffectue: number = 0;
  public coursClasseFilter: Cour[] = [];
  public cours: CourClasse[] = [];
  public tabEtudiants: Eleve[] = [];
  public tabEtudiantsFilter: Eleve[] = [];
  public user!: User;
  @ViewChild('modal') modal!: ElementRef;

  ngOnInit(): void {
    const userConnectData = localStorage.getItem('user');
    if (userConnectData) {
      this.user = JSON.parse(userConnectData!);
    }
    this.all();
  }
  constructor(private courService: CoursService, private route: Router) {}

  choixEtat(event: Event) {
    this.coursClasses = this.coursClasseFilter;
    let target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.coursClasses = this.coursClasses.filter(
      (cours) => cours.etat == target.value
    );
  }

  all() {
    this.courService.getAll().subscribe((response) => {
      if ('cours' in response.data) {
        this.coursClasses = response.data.cours as Cour[];
        this.coursClasseFilter = [...this.coursClasses];
      }
      console.log(this.coursClasses);
    });
  }

  detailCours(event: Event) {
    this.modal.nativeElement.style.display = 'block';
    let target: any = event.target;
    let id: number = target.getAttribute('id');
    this.courService.getById(id).subscribe((response) => {
      if ('cours' in response.data) {
        this.showOneCours = response.data.cours as Cour;
        this.showClasses = this.showOneCours.cours;
        this.heureGlobal = this.showOneCours.cours[0].nbr_heure;
        this.heureEffectue = this.showOneCours.cours[0].nbr_heure_effectue;
      }
    });
    this.courService.getClasseCours(id).subscribe((response) => {
      if ('users' in response.data) {
        this.tabEtudiants = response.data.users as Eleve[];
        this.tabEtudiantsFilter = this.tabEtudiants;
      }
    });
  }

  updateState(event: Event) {
    this.coursClasses = this.coursClasseFilter;
    let target: HTMLInputElement = event.target as HTMLInputElement;
    let id: number = this.showOneCours.cour_id;
    this.courService
      .updated(id, { etat: target.value })
      .subscribe((response) => {
        let findCour: Cour = this.coursClasses.find(
          (cour) => cour.cour_id == id
        ) as Cour;
        const index: number = this.coursClasses.indexOf(findCour);
        if ('cours' in response.data) {
          findCour = response.data.cours as Cour;
        }
        this.coursClasses.splice(index, 1, findCour);
        console.log(this.coursClasses);
      });
  }

  choixClasse(event: Event) {
    this.tabEtudiants = this.tabEtudiantsFilter;
    let target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.tabEtudiants = this.tabEtudiants.filter(
      (cours) => cours.classe == target.value
    );
  }

  back() {
    this.modal.nativeElement.style.display = 'none';
  }

  addSession(event: Event) {
    let target: HTMLButtonElement = event.target as HTMLButtonElement;
    console.log(this.coursClasses);
    const id: string = target.getAttribute('id') as string;
    this.courService.getClasse(+id).subscribe((response) => {
      if ('classes' in response.data) {
        localStorage.setItem('cour', JSON.stringify(response.data.classes));
        localStorage.setItem('idCour', id);
      }
      this.route.navigateByUrl('/addSession');
    });
  }
}
