import { Component, OnInit } from '@angular/core';
import { BreweryInfo } from '../../services/beweryinfo.service';

@Component({
  selector: 'app-workinghours',
  templateUrl: './workinghours.component.html',
  styleUrls: ['./workinghours.component.scss']
})
export class WorkinghoursComponent implements OnInit {

  panelOpenState = false;
  bewIfo: any;
  isLoading: Boolean;

  constructor(private bewInfo: BreweryInfo) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.bewInfo.getBreweryInfo().subscribe(
      data => {this.bewIfo = data.result[0],
      console.log('data is', data)},
      error => console.log(error),
      () => this.isLoading = false);
  }
}

