import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { FoodTruckService } from '../food-truck.service';
import { FoodTruck } from '../food-truck.model';

@Injectable()
export class SingleFoodTruckResolver implements Resolve<FoodTruck> {
    constructor(private foodTruckService: FoodTruckService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FoodTruck>|Promise<FoodTruck>|FoodTruck {
        const foodTruckID: number = +route.params['id'];
        return this.foodTruckService.fetchFoodTrucksByID(foodTruckID);
    }
}
