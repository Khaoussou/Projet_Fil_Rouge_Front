import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { CourClasse } from 'src/app/model/cour';
import { DetailSession } from 'src/app/model/detail-session';
import { MyEvent } from 'src/app/model/my-event';
import { Session } from 'src/app/model/session';
import { User } from 'src/app/model/user';
import { CoursService } from 'src/app/service/cours.service';
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
  public events: MyEvent[] = [];
  public allEvents: MyEvent[] = [];
  public eventFilter: MyEvent[] = [];
  public detailSession!: DetailSession;
  public module: string = '';
  public user!: User;
  public hd: string = '';
  public hg: number = 0;
  public heff: number = 0;
  public hr: number = 0;
  public idCour: number = 0;
  public hf: string = '';
  public date: string = '';
  public courClassId: number[] = [];
  public classes: CourClasse[] = [];
  @ViewChild('form') form!: ElementRef;

  ngOnInit(): void {
    const userConnectData = localStorage.getItem('user');
    this.user = JSON.parse(userConnectData!);
    this.all();
  }

  constructor(
    private sessionService: SessionService,
    private courService: CoursService
  ) {}

  setView(view: CalendarView) {
    this.defaultView = view;
  }

  all() {
    this.sessionService.getAll().subscribe((response) => {
      if ('session' in response.data) {
        this.sessions = response.data.session as Session[];
      }
      console.log(this.sessions);
      this.sessions.forEach((session) => {
        const event1 = {
          title: session.module,
          start: new Date(session.date + 'T' + session.heure_debut),
          end: new Date(session.date + 'T' + session.heure_fin),
          id: session.cour_id,
          sessionId: session.id,
          etat: session.etat,
          prof: session.prof,
        };
        this.events.push(event1);
        this.allEvents = this.events.filter(
          (event, index, myTab) =>
            index ===
            myTab.findIndex((e) => {
              return (
                e.title == event.title,
                e.start.getTime() == event.start.getTime(),
                e.end?.getTime() == event.end?.getTime()
              );
            })
        );
        this.eventFilter = this.allEvents;
      });
      console.log(this.events);
    });
  }

  choixModule(event: Event) {
    let target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.allEvents = this.eventFilter;
    this.allEvents = this.allEvents.filter(
      (event) => event.title == target.value
    );
  }

  choixState(event: Event) {
    let target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.allEvents = this.eventFilter;
    this.allEvents = this.allEvents.filter(
      (event) => event.etat == target.value
    );
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
    this.form.nativeElement.style.display = 'block';
    this.module = event.event.title;
    const start = new Date(event.event.start);
    const end = new Date(event.event.end);
    const heured = format(start, 'yyyy-MM-dd HH:mm:ss');
    const heuref = format(end, 'yyyy-MM-dd HH:mm:ss');
    this.hd = heured.split(' ')[1] as string;
    this.hf = heuref.split(' ')[1] as string;
    this.date = heured.split(' ')[0] as string;
    this.idCour = event.event.id;
    const id: number = event.event.id as number;
    this.courService.getClasse(id).subscribe((response) => {
      if ('classes' in response.data) {
        this.classes = response.data.classes as CourClasse[];
        this.hg = this.classes[0].nbr_heure;
        this.heff = this.classes[0].nbr_heure_effectue;
        this.hr = this.classes[0].nbr_heure_restant as number;
        this.courClassId = this.classes.map((courId) => courId.cours_classe_id);
      }
    });
  }

  back() {
    this.form.nativeElement.style.display = 'none';
  }

  updateState(event: Event) {
    this.detailSession = {
      date: this.date,
      hd: this.hd,
      hf: this.hf,
      courClasses: this.courClassId,
    };

    this.sessionService.modify(this.detailSession).subscribe((response) => {
      console.log(response.data);
    });
    this.form.nativeElement.style.display = 'none';
  }

  removeSession() {
    this.detailSession = {
      date: this.date,
      hd: this.hd,
      hf: this.hf,
      id: this.idCour,
      courClasses: this.courClassId,
    };
    this.sessionService
      .removeSession(this.detailSession)
      .subscribe((response) => {
        console.log(response);
      });
    this.form.nativeElement.style.display = 'none';
  }
}
