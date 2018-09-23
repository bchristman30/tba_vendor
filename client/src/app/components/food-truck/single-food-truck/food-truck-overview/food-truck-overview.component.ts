import { Component, OnInit } from '@angular/core';
import { FoodTruck } from '../../food-truck.model';
import { FoodTruckService } from '../../food-truck.service';

@Component({
  selector: 'app-food-truck-overview',
  templateUrl: './food-truck-overview.component.html',
  styleUrls: ['./food-truck-overview.component.scss']
})
export class FoodTruckOverviewComponent implements OnInit {
  foodTruck: FoodTruck;

  constructor(private foodTruckService: FoodTruckService) { }

  ngOnInit() {
    this.foodTruck = this.foodTruckService.getCurrentFoodTruck();
    console.log(this.foodTruck);
    
  }

}
