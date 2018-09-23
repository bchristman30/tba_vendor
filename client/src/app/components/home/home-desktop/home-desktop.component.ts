import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../../location/location.model';

@Component({
  selector: 'app-home-desktop',
  templateUrl: './home-desktop.component.html',
  styleUrls: ['./home-desktop.component.scss']
})
export class HomeDesktopComponent implements OnInit {
  @Input() locations: LocationModel;
  constructor() { }

  ngOnInit() {
  }

}
