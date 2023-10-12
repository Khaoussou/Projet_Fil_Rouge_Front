import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { PlanificationCoursComponent } from './components/planification-cours/planification-cours.component';
import { PlanificationSessionComponent } from './components/planification-session/planification-session.component';
import { ListeSessionComponent } from './components/liste-session/liste-session.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AuthGuard } from './guard/auth.guard';
import { HasRoleGuard } from './guard/role.guard';

const routes: Routes = [
  { path: '', component: ConnexionComponent },
  {
    path: 'addCours',
    component: PlanificationCoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listeCours',
    component: ListCoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addSession',
    component: PlanificationSessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listeSession',
    component: ListeSessionComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: 'RP',
    },
  },
  {
    path: 'inscrit',
    component: InscriptionComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: 'RP',
    },
  },
  {
    path: 'updatePassWord',
    component: UpdatePasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
