import { Component, OnInit } from '@angular/core';
import { Cour, CourClasse } from 'src/app/model/cour';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css'],
})
export class ListCoursComponent implements OnInit {
  public coursClasses: Cour[] = [];
  public cours: CourClasse[] = [];

  ngOnInit(): void {
    this.all();
  }
  constructor(private courService: CoursService) {}

  all() {
    this.courService.getAll().subscribe((response) => {
      if ('cours' in response.data) {
        this.coursClasses = response.data.cours as Cour[];
        console.log(this.coursClasses);
      }
    });
  }

  addSession(event: Event) {
    let target: HTMLButtonElement = event.target as HTMLButtonElement;
    console.log(this.coursClasses);
    const id: string = target.getAttribute('id') as string;
    this.courService.getClasse(+id).subscribe((response) => {
      if ('classes' in response.data) {
        console.log(response.data.classes);
        localStorage.setItem('cour', JSON.stringify(response.data.classes));
        localStorage.setItem('idCour', id);
      }
    });
  }
}
