import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../location.model';
import { ActivatedRoute, Data } from '@angular/router';
import { LocationService } from '../location.service';
import { NavItem } from '../../../shared/interfaces/nav-item.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponseArray } from '../../../models/server-request-array.model';
import { BreakpointService } from '../../../services/breakpoint.service';

@Component({
    selector: 'app-single-location',
    templateUrl: './single-location.component.html',
    styleUrls: ['./single-location.component.scss']
  })
export class SingleLocationComponent implements OnInit {
    location: LocationModel;
    tabs: Array<NavItem>;

    constructor(private route: ActivatedRoute,
                private locationService: LocationService,
                private spinner: NgxSpinnerService,
                private breakpointService: BreakpointService) { }


    ngOnInit() {
        this.spinner.hide();
        this.route.data
        .subscribe(
            (data: Data) => {
                const locationResult: ServerResponseArray = data['location'];
                this.location = locationResult.result[0];
                this.locationService.setCurrentLocation(this.location);
            }
        );

        this.tabs = [
            {label: 'Overview', link: 'overview'},
            {label: 'Beer on Tap', link: 'menu'},
            {label: 'Events', link: 'events'}
          ];
    }

    isMobile(): boolean {
        return this.breakpointService.isMobile();
    }

}
