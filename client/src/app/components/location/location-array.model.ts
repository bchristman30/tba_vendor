import { LocationHours } from '../../models/location-hours.model';
import { FoodTruck } from '../food-truck/food-truck.model';
import { ServerResponseArray } from '../../models/server-request-array.model';

export class LocationModelArray extends ServerResponseArray {
    error: boolean;
    text: string;
    result: [{
        logo_string: string;
        id: string;
        address: string;
        hours: LocationHours;
        phone: string;
        website_url: string;
        instagram: string;
        perks: string;
        brewerNotes: string;
        name: string;
        stamp_string: string;
        description: string;
        foodTrucks: [FoodTruck];
     }];
}
