import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FoodTruck } from './food-truck.model';
import { Subject } from 'rxjs';

@Injectable()
export class FoodTruckService {
	foodTrucks: FoodTruck[];
	currentFoodTruck: FoodTruck;
	currentFoodTruck$: Subject<FoodTruck>;

	constructor(private http: HttpClient) {
		this.init();
	}

	init(): void {
		this.foodTrucks = new Array<FoodTruck>();
		this.currentFoodTruck = new FoodTruck();
		this.currentFoodTruck$ = new Subject<FoodTruck>();
	}

	fetchLocations() {}

	fetchFoodTrucksByLocationID(id: number): Observable<[FoodTruck]> {
		return this.http.get<[FoodTruck]>('/api/foodTruck/' + id);
    }

    fetchFoodTrucksByID(id: number): Observable<FoodTruck> {
        return this.http.get<FoodTruck>('/api/foodTruck/' + id);
	}

	setCurrentFoodTruck(foodtruck: FoodTruck): void {
		this.currentFoodTruck = foodtruck;
		this.currentFoodTruck$.next(foodtruck);
	}

	getCurrentFoodTruck(): FoodTruck {
		return this.currentFoodTruck;
	}
}
