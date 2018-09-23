import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../location.model';
import { LocationService } from '../../location.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-location-desktop',
  templateUrl: './single-location-desktop.component.html',
  styleUrls: ['./single-location-desktop.component.scss']
})
export class SingleLocationDesktopComponent implements OnInit {
  location: LocationModel;

  constructor(private locationService: LocationService,
            private spinner: NgxSpinnerService,
            private router: Router) { }

  ngOnInit() {
    this.location = this.locationService.getCurrentLocation();
  }

  openBeer(id: string): void {
    this.spinner.show();
    this.router.navigate(['/beer/' + id]);
  }

}
