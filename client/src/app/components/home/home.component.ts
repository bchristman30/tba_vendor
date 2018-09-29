import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatSidenav} from '@angular/material/sidenav';

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

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private locationService: LocationService,
              private breakpointService: BreakpointService) { }

  ngOnInit() {
    this.locations = this.locationService.getLocations();
    this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
      this.locations = l;
    });
  }

  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }

}
