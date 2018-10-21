import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import { MatSidenav} from '@angular/material/sidenav';
import { BreweryInfo } from '../../services/beweryinfo.service';

@Component({
  selector: 'app-maininfo',
  templateUrl: './maininfo.component.html',
  styleUrls: ['./maininfo.component.scss']
})
export class MaininfoComponent implements OnInit {
  locations: Array<LocationModel>;
  locationSub: Subscription = new Subscription();
  events: string[] = [];
  opened: boolean;
  tilecolor: String = '#ccc';
  color: String = '#000';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  location: any;
  bewIfo: any;
  isLoading: Boolean;




  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private locationService: LocationService,
              private breakpointService: BreakpointService,
              private bewInfo: BreweryInfo
            ) { }

  ngOnInit() {
    this.spinner.show();
    this.getInfo();
    this.locations = this.locationService.getLocations();
    this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
      this.locations = l;
    });
  }

  getInfo() {
    this.bewInfo.getBreweryInfo().subscribe(
      data => {this.bewIfo = data.result[0],
      console.log('data is', data),
      this.spinner.hide();
    },
      error => console.log(error),
      () => this.isLoading = false);

  }
  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }

}
