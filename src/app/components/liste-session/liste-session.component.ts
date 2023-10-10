import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Session } from 'src/app/model/session';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-liste-session',
  templateUrl: './liste-session.component.html',
  styleUrls: ['./liste-session.component.css'],
})
export class ListeSessionComponent implements OnInit {
  public viewDate: Date = new Date();
  public defaultView: CalendarView = CalendarView.Week;
  public calendarView = CalendarView;
  public sessions: Session[] = [];
  public allSessions: Session[] = [];
  public detail: boolean = false;
  public events: CalendarEvent[] = [];

  ngOnInit(): void {
    this.all();
  }

  constructor(private sessionService: SessionService) {
    this.sessionService.getAll().subscribe((response) => {
      if ('session' in response.data) {
        this.sessions = response.data.session as Session[];
        this.allSessions = this.sessions;
      }
      console.log(this.sessions);
      
      const event1 = {
        title: 'Cours Angular',
        start: new Date(
          this.sessions[0].date + 'T' + this.sessions[0].heure_debut
        ),
        end: new Date(
          this.sessions[0].date + 'T' + this.sessions[0].heure_fin
        ),
      };
      this.events.push(event1);
      console.log(this.events);   
      console.log(this.sessions[0].date);
         
    });
    // const event1 = {
    //   title: 'Cours Angular',
    //   start: new Date('2023-10-12T10:30'),
    //   end: new Date('2023-10-12T13:30'),
    // };
    // this.events.push(event1);
  }

  setView(view: CalendarView) {
    this.defaultView = view;
  }

  all() {
    this.allSessions = [];
  }
}
