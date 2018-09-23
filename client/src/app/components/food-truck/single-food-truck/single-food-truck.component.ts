import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { FoodTruck } from '../food-truck.model';
import { NavItem } from '../../../shared/interfaces/nav-item.interface';
import { FoodTruckService } from '../food-truck.service';
import { ServerResponseArray } from '../../../models/server-request-array.model';


@Component({
    selector: 'app-single-food-truck',
    templateUrl: './single-food-truck.component.html',
    styleUrls: ['./single-food-truck.component.scss']
  })
export class SingleFoodTruckComponent implements OnInit {
    foodTruck: FoodTruck;
    tabs: Array<NavItem>;

    constructor(private route: ActivatedRoute,
                private foodTruckService: FoodTruckService) {}

    ngOnInit(): void {
        this.route.data
        .subscribe(
            (data: Data) => {
                const foodTruckResult: ServerResponseArray = data['foodTruck'];
                this.foodTruck = foodTruckResult.result[0];
                this.foodTruckService.setCurrentFoodTruck(this.foodTruck);
                console.log(this.foodTruck);
            }
        );

        this.tabs = [
            {label: 'Overview', link: 'overview'},
            {label: 'Menu', link: 'menu'},
            {label: 'Calendar', link: 'calendar'}
          ];
    }

}
