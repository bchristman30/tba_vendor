import { LocationHours } from '../../models/location-hours.model';
import { FoodTruck } from '../food-truck/food-truck.model';

export class LocationModel {
    id: string;
    logo_string: string;
    address: string;
    hours: LocationHours;
    city: string;
    zipcode: string;
    state: string;
    location_beers: any;
    location_reviews: any;
    location_amenities: any;
    location_calendar: Array<LocationCalendarEvent>;
    phone: string;
    website_url: string;
    instagram: string;
    perks: string;
    brewerNotes: string;
    name: string;
    stamp_string: string;
    description: string;
    foodTrucks: [FoodTruck];
}

export class LocationCalendarEvent {
    id: string;
    start_date: Date;
    end_date: Date;
    type: string;
    location_id: string;
    referring_id: string;
    events: Array<LocationEvent>;
}

export class LocationEvent {
    id: string;
    name: string;
    featured_image: string;
    type: string;
    created_at: string;
    updated_at: string;
}
