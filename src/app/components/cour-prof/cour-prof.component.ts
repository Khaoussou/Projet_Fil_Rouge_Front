import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cour, CourClasse } from 'src/app/model/cour';
import { Inscription } from 'src/app/model/inscription';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-cour-prof',
  templateUrl: './cour-prof.component.html',
  styleUrls: ['./cour-prof.component.css'],
})
export class CourProfComponent implements OnInit {
  public coursProfs: Cour[] = [];
  public idProf: number = 0;
  public nomProf: string = '';
  public tabEtudiants: Inscription[] = [];
  public showClasses: CourClasse[] = [];


  ngOnInit(): void {
    const userConnectData = localStorage.getItem('user');
    const userConnect = JSON.parse(userConnectData!);
    if (userConnect) {
      this.idProf = userConnect.prof_id;
    }
    this.all();
  }

  constructor(private courService: CoursService, private route: Router) {}

  all() {
    this.courService.getCourProf(this.idProf).subscribe((response) => {
      if ('prof' in response.data) {
        this.coursProfs = response.data.prof as Cour[];
        this.nomProf = this.coursProfs[0].professeur as string;
      }
    });
  }

  voirSession(event: Event) {
    this.route.navigateByUrl('/sessionProf');
  }
}
