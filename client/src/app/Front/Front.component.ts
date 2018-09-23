import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/interfaces/nav-item.interface';

@Component({
  selector: 'app-front',
  templateUrl: './Front.component.html',
  styleUrls: ['./Front.component.css']
})
export class FrontComponent implements OnInit {
  tabs: Array<NavItem>;

  constructor() {
  }

  ngOnInit() {
    this.tabs = [
      {label: 'Login', link: '/login'},
      {label: 'Registration', link: 'registration'}
    ];
  }

}
