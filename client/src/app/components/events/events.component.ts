import { Component, OnInit, ElementRef, ViewChild, Pipe, PipeTransform  } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatSidenav} from '@angular/material/sidenav';
import { AuthService } from '../../auth/auth.service';
import { BreweryInfo } from '../../services/beweryinfo.service';
import { DatePipe } from '@angular/common';
import { DialogboxnewComponent } from '../../dialogboxnew/dialogboxnew.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  dateisa: any;
  locations: Array<LocationModel>;
  locationSub: Subscription = new Subscription();
  events: string[] = [];
  opened: boolean;
  tilecolor: String = '#ccc';
  color: String = '#000';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  isAuth: Boolean = false;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  userdata: any;
  location_id: any;
  location: any;
  bewIfo: any;
  upEvents: any;
  isLoading: Boolean;
  totalevents: any;
  stampCount: any;
  tapbeer: any;
  myDate: any;
  @ViewChild('picker') myDiv: ElementRef;

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private locationService: LocationService,
    private breakpointService: BreakpointService,
    private authService: AuthService,
    private bewInfo: BreweryInfo, private datePipe: DatePipe,
    public dialog: MatDialog  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(resp => {
      this.isAuth = resp.isauth;
      this.issubscription_expired = resp.issubscription_expired;
      this.issubscription = resp.issubscription;
    });

    this.isAuth = this.authService.isLoggedIn();
    if ( this.isAuth ) {
      this.spinner.show();
      this.userdata = JSON.parse(localStorage.getItem('user'));
      this.location = this.userdata.location.name;
      this.location_id = this.userdata.location.id;
      this.getInfo();
      this.getupcomingEvents();
      console.log('logged in userdata', this.userdata);
      console.log('logged in bew', this.bewIfo);
    } else {
      this.router.navigate(['/login']);
    }
    // const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    // const s =   el.nodeValue;
    // console.log('date is', s);

    this.locations = this.locationService.getLocations();
    this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
      this.locations = l;
    });
  }


  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }

  updateMyDate(newDate) {
    this.myDate = newDate;
    const dateis =   this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.bewInfo.getUpEventsBydate(this.location_id, dateis).subscribe(
      data => {
        if ( data.result.length > 0) { this.upEvents = data.result,
          this.upEvents = data.result,
          this.totalevents = data.result.length,
          this.spinner.hide(),
          console.log('data events is', data)}
      },
      error => console.log(error),
      () => this.isLoading = false);
  }


  getInfo() {
    this.bewInfo.getBreweryInfo(this.location_id).subscribe(
    data => {this.bewIfo = data.result[0],
    console.log('data is', data)},
    error => console.log(error),
    () => this.isLoading = false);
}



getupcomingEvents() {
  this.bewInfo.getUpEvents(this.location_id).subscribe(
    data => {this.upEvents = data.result,
      this.totalevents = data.result.length,
      this.spinner.hide(),
    console.log('data events is', data)},
    error => console.log(error),
    () => this.isLoading = false);
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogboxnewComponent, {
    width: '350px',
    data: { text: 'this.info', status: true }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed' + result);

    if ( result === '1') {
      this.router.navigate(['/newfoodtruck']);
    } else {
      this.router.navigate(['/newevent']);
    }
  });
}

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }


  xLogout() {
    this.authService.logout();
  }

  // dateis(e) {
  //  // var datePipe = new DatePipe("en-US");
  //   const dateValue = this.transform(e);
  //   console.log('date is', dateValue);
  //   const datePipe = new DatePipe('en-US');
  //   const values = datePipe.transform(e, 'dd/MM/yyyy');
  //   console.log('date is', values);
  // }

  transform(value: string) {
      const datePipe = new DatePipe('en-US');
         value = datePipe.transform(value, 'yyyy-mm-dd');
        return value;
 }

  // public onDate(event): void {
  //   console.log('date is', event);
  //   const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
  //   const s =   el.nodeValue;
  //   console.log('date is', s);

  // }

}
