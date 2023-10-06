import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { PlanificationCoursComponent } from './components/planification-cours/planification-cours.component';

const routes: Routes = [
  { path: 'listeCours', component: ListCoursComponent },
  { path: '', component: PlanificationCoursComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
