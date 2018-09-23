import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../location.service';
import { LocationModel } from '../../location.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss']
})
export class LocationMenuComponent implements OnInit {
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
