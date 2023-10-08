import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { PlanificationCoursComponent } from './components/planification-cours/planification-cours.component';
import { PlanificationSessionComponent } from './components/planification-session/planification-session.component';

const routes: Routes = [
  { path: '', component: PlanificationCoursComponent },
  { path: 'listeCours', component: ListCoursComponent },
  { path: 'addSession', component: PlanificationSessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
