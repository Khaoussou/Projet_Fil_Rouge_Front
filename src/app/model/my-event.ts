import { CalendarEvent } from 'angular-calendar';

export interface MyEvent extends CalendarEvent {
  id: number;
  etat: string;
  prof: string;
}
