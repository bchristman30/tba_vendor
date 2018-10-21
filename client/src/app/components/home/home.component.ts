import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatSidenav} from '@angular/material/sidenav';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { BreweryInfo } from '../../services/beweryinfo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Array<LocationModel>;
  locationSub: Subscription = new Subscription();
  events: string[] = [];
  opened: boolean;
  tilecolor: String = '#ccc';
  color: String = '#000';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  currentUser: User;
  isAuth: Boolean = false;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  userdata: any;
  location: any;
  bewIfo: any;
  upEvents: any;
  isLoading: Boolean;

  constructor(
              private router: Router,
              private spinner: NgxSpinnerService,
              private locationService: LocationService,
              private authService: AuthService,
              private breakpointService: BreakpointService,
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
      this.userdata = JSON.parse(localStorage.getItem('user'));
      this.location = this.userdata.location.name;
      this.getInfo();
      this.getupcomingEvents();
      console.log('logged in userdata', this.userdata);
      console.log('logged in bew', this.bewIfo);
    } else {
      this.router.navigate(['/login']);
    }

  }


  getInfo() {
      this.bewInfo.getBreweryInfo().subscribe(
      data => {this.bewIfo = data.result[0],
      console.log('data is', data)},
      error => console.log(error),
      () => this.isLoading = false);

  }

  getupcomingEvents() {
    this.bewInfo.getUpEvents().subscribe(
      data => {this.upEvents = data.result,
      console.log('data events is', data)},
      error => console.log(error),
      () => this.isLoading = false);
  }

  xLogout() {
    this.authService.logout();
  }


  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }

}
