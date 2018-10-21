import { Component, OnInit } from '@angular/core';
import { BreweryInfo } from '../../services/beweryinfo.service';

@Component({
  selector: 'app-workinghours',
  templateUrl: './workinghours.component.html',
  styleUrls: ['./workinghours.component.scss']
})
export class WorkinghoursComponent implements OnInit {

  panelOpenState = false;
  bewIfoHours: any;
  monHours: any;
  tueHours: any;
  wedHours: any;
  thurHours: any;
  friHours: any;
  isLoading: Boolean;

  constructor(private bewInfo: BreweryInfo) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.bewInfo.getBreweryInfo().subscribe(
      data => {this.bewIfoHours = data.result[0].location_hours,
        this.monHours = data.result[0].location_hours[0],
        this.tueHours = data.result[0].location_hours[1],
        this.wedHours = data.result[0].location_hours[2],
        this.thurHours = data.result[0].location_hours[3],
        this.friHours = data.result[0].location_hours[4],

      console.log('working hours is', this.bewIfoHours)},
      error => console.log(error),
      () => this.isLoading = false);
  }
}

