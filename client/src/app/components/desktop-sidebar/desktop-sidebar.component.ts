import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../location/location.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-desktop-sidebar',
  templateUrl: './desktop-sidebar.component.html',
  styleUrls: ['./desktop-sidebar.component.scss']
})
export class DesktopSidebarComponent implements OnInit {
  @Input() location: LocationModel;

  constructor() { }

  ngOnInit() {
  }

  hasLocation(): boolean {
    return !isNullOrUndefined(this.location);
  }

}
