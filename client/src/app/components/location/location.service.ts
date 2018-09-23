import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { LocationModel, LocationCalendarEvent } from './location.model';
import { Subject } from 'rxjs/Subject';
import { isNullOrUndefined, isNull } from 'util';
import { Observable } from 'rxjs/Observable';
import { ServerResponseArray } from '../../models/server-request-array.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class LocationService {
	locations: Array<LocationModel>;
	locationsDidChange$: Subject<Array<LocationModel>> = new Subject<Array<LocationModel>>();
	currentLocation: LocationModel;
	currentLocation$: Subject<LocationModel>;

	constructor(private http: HttpClient) {
		this.init();
	}

	init() {
		this.locations = new Array<LocationModel>();
		this.currentLocation = new LocationModel();
		this.currentLocation$ = new Subject<LocationModel>();
		this.fetchLocations();
	}

	fetchLocations() {
		this.http.get<ServerResponseArray>('/api/location/latest')
			.subscribe(locations => {
				this.locations = locations.result;
				this.updateLocationsChange(this.locations);
			});
	}

	fetchNearestLocationLatLong(currentLat: number, currentLng: number): Observable<ServerResponseArray> {
		const user = { currentLat: currentLat, currentLng: currentLng };
		return this.http.post<ServerResponseArray>('/api/location/nearest', user);
	}

	fetchLocationCaledar(id: string): Observable<ServerResponseArray> {
		return this.http.get<ServerResponseArray>('/api/location/calendar/' + id);
	}

	setCurrentLocationCalendar(locationCaledar: Array<LocationCalendarEvent>) {
		this.currentLocation.location_calendar = locationCaledar;
		this.updateCurrentLocation();
	}

	private updateCurrentLocation(): void {
		this.currentLocation$.next(this.currentLocation);
	}

	fetchLocationByID(id: string): Observable<ServerResponseArray> {
		return this.http.get<ServerResponseArray>('/api/location/' + id)
			.pipe(
				tap(location => this.fetchLocationCaledar(id)
					.subscribe(resp => location.result[0].location_calendar = resp.result)
				)
			);
	}

	getLocations(): Array<LocationModel> {
		return this.locations;
	}

	getLocationByID(id: string): LocationModel {
		if (!isNullOrUndefined(this.locations)) {
			return this.locations.find(x => x.id === id);
		} else {
			this.fetchLocationByID(id).subscribe((location: ServerResponseArray) => {
				return location.result[0];
			});
		}
	}

	setLocations(locations: Array<LocationModel>): void {
		this.locations = locations;
		this.updateLocationsChange(this.locations);
	}

	setCurrentLocation(location: LocationModel): void {
		this.currentLocation = location;
		this.currentLocation$.next(this.currentLocation);
	}

	getCurrentLocation(): LocationModel {
		return this.currentLocation;
	}

	private updateLocationsChange(loc: Array<LocationModel>): void {
		this.locationsDidChange$.next(loc);
	}
}
