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
import { CourProfComponent } from './components/cour-prof/cour-prof.component';
import { SessionProfComponent } from './components/session-prof/session-prof.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent },
  {
    path: 'addCours',
    component: PlanificationCoursComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['RP'],
    },
  },
  {
    path: 'listeCours',
    component: ListCoursComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['RP', 'Attache'],
    },
  },
  {
    path: 'addSession',
    component: PlanificationSessionComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['RP'],
    },
  },
  {
    path: 'listeSession',
    component: ListeSessionComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['RP', 'Attache'],
    },
  },
  {
    path: 'inscrit',
    component: InscriptionComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['RP'],
    },
  },
  {
    path: 'updatePassWord',
    component: UpdatePasswordComponent,
  },
  {
    path: 'courProf',
    component: CourProfComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['Prof'],
    },
  },
  {
    path: 'sessionProf',
    component: SessionProfComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['Prof']
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
