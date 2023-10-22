import { CalendarEvent } from 'angular-calendar';

export interface MyEvent extends CalendarEvent {
  id: number;
  sessionId: number;
  etat: string;
  prof: string;
}
