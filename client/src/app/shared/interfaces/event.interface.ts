import { CalendarEvent } from 'angular-calendar';

export interface MyEvent extends CalendarEvent {
    referring_id: string;
    type:string;
  }