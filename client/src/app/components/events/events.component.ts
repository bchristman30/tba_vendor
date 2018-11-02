import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatSidenav} from '@angular/material/sidenav';
import { AuthService } from '../../auth/auth.service';
import { BreweryInfo } from '../../services/beweryinfo.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

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


  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private locationService: LocationService,
    private breakpointService: BreakpointService,
    private authService: AuthService,
    private bewInfo: BreweryInfo

  ) { }

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


    this.locations = this.locationService.getLocations();
    this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
      this.locations = l;
    });
  }
  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }


  getInfo() {
    this.bewInfo.getBreweryInfo(this.location_id).subscribe(
    data => {this.bewIfo = data.result[0],
      this.stampCount = data.result[0].total_redeemed_stamp,
      this.tapbeer = data.result[0].location_beers.length,
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



  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }


  xLogout() {
    this.authService.logout();
  }



}
