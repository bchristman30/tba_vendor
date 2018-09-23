import { Component, OnInit } from '@angular/core';
import { FoodTruck } from '../../food-truck.model';
import { FoodTruckService } from '../../food-truck.service';

@Component({
  selector: 'app-food-truck-menu',
  templateUrl: './food-truck-menu.component.html',
  styleUrls: ['./food-truck-menu.component.scss']
})
export class FoodTruckMenuComponent implements OnInit {
  foodTruck: FoodTruck;

  constructor(private foodTruckService: FoodTruckService) { }

  ngOnInit() {
    this.foodTruck = this.foodTruckService.getCurrentFoodTruck();
  }

}
