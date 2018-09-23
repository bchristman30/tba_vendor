import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../location/location.model';
import { LocationService } from '../location/location.service';
import { AppConstants } from '../../shared/constants/app-constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-event-card-square',
  templateUrl: './event-card-square.component.html',
  styleUrls: ['./event-card-square.component.scss']
})
export class EventCardSquareComponent implements OnInit {
  @Input() location: LocationModel;
  defaultLocationFallback: string;
  constructor(private locationService: LocationService,
              private route: Router,
		          private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.defaultLocationFallback = AppConstants.DEFAULT_LOCATION_IMAGE;
  }

  openLocation(): void {
    this.spinner.show();
    this.route.navigate(['/brewery/' + this.location.id]);
}

}
