import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanificationCoursComponent } from './components/planification-cours/planification-cours.component';
import { NavBarrComponent } from './components/nav-barr/nav-barr.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanificationSessionComponent } from './components/planification-session/planification-session.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    PlanificationCoursComponent,
    NavBarrComponent,
    ListCoursComponent,
    PlanificationSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
