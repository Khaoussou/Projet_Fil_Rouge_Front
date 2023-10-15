import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
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

  constructor(private sessionService: SessionService) {}

  setView(view: CalendarView) {
    this.defaultView = view;
  }

  all() {
    this.sessionService.getAll().subscribe((response) => {
      if ('session' in response.data) {
        this.sessions = response.data.session as Session[];
      }
      this.sessions.forEach((session) => {
        const event1 = {
          title: session.prof,
          start: new Date(session.date + 'T' + session.heure_debut),
          end: new Date(session.date + 'T' + session.heure_fin),
        };
        this.events.push(event1);
      });
      console.log(this.events);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.detail === true) ||
        events.length === 0
      ) {
        setTimeout(() => {
          this.detail = false;
        }, 3000);
      } else {
        setTimeout(() => {
          this.detail = true;
        }, 3000);
        this.viewDate = date;
      }
    }
  }

  detailEvent(event: any) {
    console.log(event);
  }
}
