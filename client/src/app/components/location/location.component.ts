import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { LocationModelArray } from './location-array.model';
import { Subscription } from 'rxjs/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LocationModel } from './location.model';
import { AppConstants } from '../../shared/constants/app-constants';

@Component({
    selector: 'app-locations',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
  })
export class LocationComponent implements OnInit {
    locations: Array<LocationModel>;
    locationSub: Subscription = new Subscription();
    defaultLocationFallback: string;

    constructor(private locationService: LocationService,
                private spinner: NgxSpinnerService,
                private router: Router) { }

    ngOnInit() {
        this.locations = this.locationService.getLocations();
        this.spinner.hide();
        this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
            this.locations = l;
        });
        this.defaultLocationFallback = AppConstants.DEFAULT_LOCATION_IMAGE;
    }

    openLocation(id: string): void {
        this.spinner.show();
        this.router.navigate(['/brewery/' + id]);
    }
}
