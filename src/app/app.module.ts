import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeFr from '@angular/common/locales/fr';

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
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { registerLocaleData } from '@angular/common';
import { ConnexionComponent } from './components/connexion/connexion.component';

registerLocaleData(localeFr, 'fr');

class FormatDate extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PlanificationCoursComponent,
    NavBarrComponent,
    ListCoursComponent,
    PlanificationSessionComponent,
    ListeSessionComponent,
    InscriptionComponent,
    UpdatePasswordComponent,
    ConnexionComponent,
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
  providers: [{ provide: CalendarDateFormatter, useClass: FormatDate }],
  bootstrap: [AppComponent],
})
export class AppModule {}
