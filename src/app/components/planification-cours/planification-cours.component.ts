import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Classe } from 'src/app/model/classe';
import { Cour } from 'src/app/model/cour';
import { Module } from 'src/app/model/module';
import { ProfModule } from 'src/app/model/prof-module';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-planification-cours',
  templateUrl: './planification-cours.component.html',
  styleUrls: ['./planification-cours.component.css'],
})
export class PlanificationCoursComponent implements OnInit {
  public coursForm!: FormGroup;
  public modules: Module[] = [];
  public profs: ProfModule[] = [];
  public cours: Cour[] = [];
  public classeAnnees: Classe[] = [];
  public message: string = '';
  public succes: string = '';
  public index: number = 0;
  public tabClasses!: FormArray<any>;

  ngOnInit(): void {
    this.all();
  }

  constructor(private fb: FormBuilder, private coursService: CoursService) {}

  all() {
    this.coursService.getAll().subscribe((response) => {
      if ('modules' in response.data) {
        this.modules = response.data.modules as Module[];
      }
      if ('classes' in response.data) {
        this.classeAnnees = response.data.classes as Classe[];
        console.log(response.data.classes);
      }
    });
  }

  form = this.fb.group({
    module_id: [0, Validators.required],
    professeur_id: [0, Validators.required],
    semestre_id: [0, Validators.required],
    classes: this.fb.array([]),
  });

  get classes() {
    return this.form.get('classes') as FormArray;
  }

  change(event: Event) {
    this.profs = [];
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.coursService.getProf(+target.value).subscribe((response) => {
      if ('prof' in response.data) {
        this.profs.push(response.data.prof as ProfModule);
        this.message = '';
      } else {
        this.message = response.message;
      }
    });
  }

  newRow() {
    return this.fb.group({
      classe_annee_id: this.fb.control(0, Validators.required),
      nbr_heure: this.fb.control('', Validators.required),
    });
  }

  addClasse() {
    this.tabClasses = this.form.get('classes') as FormArray;
    this.tabClasses.push(this.newRow());
    this.index++;
  }

  deleteCaract(index: number) {
    this.tabClasses = this.form.get('classes') as FormArray;
    this.tabClasses.removeAt(index);
    this.index = index;
  }

  onSubmit() {
    this.coursService.add(this.form.value).subscribe((response) => {
      this.succes = response.message;
    });
    console.log(this.form.value);
  }
}
