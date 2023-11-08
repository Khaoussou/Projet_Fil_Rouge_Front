import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { MyEvent } from 'src/app/model/my-event';
import { Session } from 'src/app/model/session';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-session-prof',
  templateUrl: './session-prof.component.html',
  styleUrls: ['./session-prof.component.css'],
})
export class SessionProfComponent implements OnInit {
  public viewDate: Date = new Date();
  public defaultView: CalendarView = CalendarView.Week;
  public calendarView = CalendarView;
  public sessions: Session[] = [];
  public allSessions: Session[] = [];
  public detail: boolean = false;
  public events: MyEvent[] = [];
  public idProf: number = 0;
  public idUser: number = 0;
  public allEvents: MyEvent[] = [];
  public eventFilter: MyEvent[] = [];
  public valueDemande: string = '';
  public hd: string = '';
  public hf: string = '';
  public date: string = '';

  @ViewChild('form') form!: ElementRef;
  @ViewChild('text') text!: ElementRef;

  ngOnInit(): void {
    const userConnectData = localStorage.getItem('user');
    const userConnect = JSON.parse(userConnectData!);
    if (userConnect) {
      this.idProf = userConnect.prof_id;
      this.idUser = userConnect.user_id;
    }
    this.all();
  }

  constructor(private sessionService: SessionService) {}

  setView(view: CalendarView) {
    this.defaultView = view;
  }

  all() {
    this.sessionService.sessionProf(this.idProf).subscribe((response) => {
      if ('sessions' in response.data) {
        this.sessions = response.data.sessions as Session[];
      }
      this.sessions.forEach((session) => {
        const event1 = {
          title: session.module,
          start: new Date(session.date + 'T' + session.heure_debut),
          end: new Date(session.date + 'T' + session.heure_fin),
          id: session.cour_id,
          sessionId: session.id,
          etat: session.etat,
          prof: session.prof,
          demande: session.demande,
          salle: session.salle
        };
        this.events.push(event1);
        this.allEvents = this.events.filter(
          (event, index, myTab) =>
            index ==
            myTab.findIndex((e) => {
              return (
                e.title == event.title,
                e.start == event.start,
                e.end == event.end
              );
            })
        );
        this.eventFilter = this.allEvents;
      });
      console.log(this.events);
      console.log(this.allEvents);
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

  choixModule(event: Event) {
    let target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.allEvents = this.eventFilter;
    this.allEvents = this.allEvents.filter(
      (event) => event.title == target.value
    );
  }

  detailEvent(event: any) {
    const start = new Date(event.event.start);
    const end = new Date(event.event.end);
    const heured = format(start, 'yyyy-MM-dd HH:mm:ss');
    const heuref = format(end, 'yyyy-MM-dd HH:mm:ss');
    this.hd = heured.split(' ')[1] as string;
    this.hf = heuref.split(' ')[1] as string;
    this.date = heured.split(' ')[0] as string;

    this.valueDemande = event.event.demande;
    this.form.nativeElement.style.display = 'block';
    console.log(this.idUser);
  }

  back() {
    this.form.nativeElement.style.display = 'none';
  }

  demande() {
    const message =
      this.text.nativeElement.value +
      ' ' +
      '.' +
      'Voici les données de la séssion : ' +
      this.date +
      ' ' +
      this.hd +
      ' ' +
      this.hf +
      ' ';
    const data = {
      hd: this.hd,
      hf: this.hf,
      date: this.date,
      id: this.idUser,
      message: message,
    };

    this.sessionService.demandeSession(data).subscribe((response) => {
      console.log(response);
    });

    this.text.nativeElement.value = '';
    this.form.nativeElement.style.display = 'none';
  }
}
