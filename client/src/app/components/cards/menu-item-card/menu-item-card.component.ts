import { Component, OnInit, Input } from '@angular/core';
import { FoodTruckMenuItem } from '../../food-truck/food-truck.model';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss']
})
export class MenuItemCardComponent implements OnInit {
  @Input() menuItem: FoodTruckMenuItem;

  constructor() { }

  ngOnInit() {
  }

}
