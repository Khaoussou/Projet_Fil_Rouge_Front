import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanificationCoursComponent } from './components/planification-cours/planification-cours.component';
import { NavBarrComponent } from './components/nav-barr/nav-barr.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanificationSessionComponent } from './components/planification-session/planification-session.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListeSessionComponent } from './components/liste-session/liste-session.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    PlanificationCoursComponent,
    NavBarrComponent,
    ListCoursComponent,
    PlanificationSessionComponent,
    ListeSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
