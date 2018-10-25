import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatSidenav} from '@angular/material/sidenav';
import { BeerService } from '../../services/beer.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-yourbeer',
  templateUrl: './yourbeer.component.html',
  styleUrls: ['./yourbeer.component.scss']
})
export class YourbeerComponent implements OnInit {

  locations: Array<LocationModel>;
  locationSub: Subscription = new Subscription();
  events: string[] = [];
  opened: boolean;
  tilecolor: String = '#ccc';
  color: String = '#000';
  isAuth: Boolean = false;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  userdata: any;
  location: any;
  location_id: any;
  activeBeers: any;
  isLoading: any;
  archiveBeers: any;

  activeBeerCount: any;
  archiveBeerCount: any;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(private router: Router,
              private beerService: BeerService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private locationService: LocationService,
              private breakpointService: BreakpointService) { }

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
      this.locations = this.locationService.getLocations();
      this.getallBears();
      this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
      this.locations = l;
      });
    }  else {
      this.router.navigate(['/login']);
    }


  }

  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }

  getallBears() {
    this.beerService.getallBears(this.location_id).subscribe(
    data => {this.activeBeers = data.result.activebeers,
      this.activeBeerCount = data.result.activebeers.length,
      this.archiveBeerCount = data.result.archivebeers.length,
      this.archiveBeers = data.result.archivebeers,
      this.spinner.hide(),

    console.log('data beers', data)},
    error => console.log(error),
    () => this.isLoading = false);
}


}
