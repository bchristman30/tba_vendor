import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../location/location.model';
import { LocationService } from '../../location/location.service';
import { isNullOrUndefined } from 'util';
import { AppConstants } from '../../../shared/constants/app-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss']
})
export class HeaderDesktopComponent implements OnInit {
  location: LocationModel;
  headerImg: string;
  locationName: string;
  showDefaultLogo: boolean;

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit() {
    this.showDefaultLogo = true;
    this.locationName = '';
    this.headerImg = !isNullOrUndefined(this.location) ? this.location.logo_string : AppConstants.DEFAULT_LOGO;
    this.router.events.subscribe(v => {
      this.checkRouterStateForLogo();
    });

    this.checkRouterStateForLogo();
  }

  private checkRouterStateForLogo(): void {
    if (this.router.url.startsWith('/brewery/')) {
      this.showDefaultLogo = false;
      this.location = this.locationService.currentLocation;
      this.locationService.currentLocation$.subscribe(location => {
        this.location = location;
        this.headerImg = !isNullOrUndefined(this.location) ? this.location.logo_string : AppConstants.DEFAULT_LOGO;
        this.locationName = this.location.name;
      });
    } else {
      this.headerImg = AppConstants.DEFAULT_LOGO;
      this.locationName = '';
      this.showDefaultLogo = true;
    }
  }

}
