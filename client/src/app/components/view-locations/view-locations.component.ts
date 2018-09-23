import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../shared/interfaces/nav-item.interface';

@Component({
  selector: 'app-view-locations',
  templateUrl: './view-locations.component.html',
  styleUrls: ['./view-locations.component.scss']
})
export class ViewLocationsComponent implements OnInit {
  tabs: Array<NavItem>;

  constructor() { }

  ngOnInit() {
    this.tabs = [
      {label: 'Map', link: 'map-view'},
      {label: 'List', link: 'list-view'}
    ];
  }

}
