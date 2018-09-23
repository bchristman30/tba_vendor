import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../location.service';
import { LocationModel, LocationEvent, LocationCalendarEvent } from '../../location.model';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import { CalendarEvent } from 'angular-calendar';
import { MyEvent } from '../../../../shared/interfaces/event.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-location-events',
  templateUrl: './location-events.component.html',
  styleUrls: ['./location-events.component.scss']
})
export class LocationEventsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view = 'month';
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: MyEvent[];
  activeDayIsOpen = true;
  locationEvents: Array<LocationCalendarEvent>;
  curLocation: LocationModel;
  arr: any = [];

  constructor(private modal: NgbModal,
    private locationService: LocationService,
    private router: Router,
    private spinner: NgxSpinnerService) {
      this.curLocation = this.locationService.getCurrentLocation();
      this.events = [];
    }


  ngOnInit() {
    if (isNullOrUndefined(this.curLocation.location_calendar)) {
      this.spinner.show();
      this.locationService.fetchLocationCaledar(this.curLocation.id).subscribe((res) => {
        this.spinner.hide();
        if (res.result.length > 0) {
          res.result.forEach(cal => {
            this.arr.push({
              start:  moment(cal.start_date).toDate(),
              end:  moment(cal.end_date).toDate(),
              title: this.buildCalendarEventCard(cal),
              color: colors.blue,
              referring_id: cal.events[0].id,
              type: cal.events[0].type
            });
          });
          this.events = this.arr;
          this.refresh.next();
        } else {
          this.events = [];
        }
      });
    } else if (this.curLocation.location_calendar.length > 0) {
      this.curLocation.location_calendar.forEach(cal => {
        this.arr.push({
          start:  moment(cal.start_date).toDate(),
          end:  moment(cal.end_date).toDate(),
          title: this.buildCalendarEventCard(cal),
          color: colors.blue,
          referring_id: cal.events[0].id,
          type: cal.events[0].type
        });
      });
      this.events = this.arr;
      this.refresh.next();
    } else {
      this.events = [];
    }
  }

  private buildCalendarEventCard(calendarEvent: LocationCalendarEvent): string {
    let eventCard: string;
    // tslint:disable-next-line:max-line-length
    eventCard = `<div class="cal-event-wrapper"><div class="cal-event-date">` + moment(calendarEvent.start_date).format('YYYY-MM-DD') + `</div>
    <div class="cal-event-time">` + moment(calendarEvent.start_date).format('h:mm a') + '-' + moment(calendarEvent.end_date).format('h:mm a') + `</div>
    <div class="cal-event-content">
    <div class="cal-event-content-background"></div>
    <div class="cal-event-content-overlay"></div>
    <div class="cal-event-content-name">` + calendarEvent.events[0].name + `</div>
    </div></div>`;
    return eventCard;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(action: string, event: MyEvent): void {
    // alert('Fetch Further Information api endpoint:/api/' + event.type + '/' + event.referring_id);
    if (event.type === 'event') {
      alert('event');
    } else if (event.type === 'foodtruck') {
      this.router.navigate(['/food-truck/' + event.referring_id]);
    } else {
      alert('could not fetch data.')
    }
  }

}
