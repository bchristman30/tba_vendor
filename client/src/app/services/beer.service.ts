import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Beer } from '../models/beer.model';
import { ServerResponseArray } from '../models/server-request-array.model';
import { Observable } from 'rxjs/Observable';
import { BreweryInfo } from '../services/beweryinfo.service';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class BeerService {
	constructor(private http: HttpClient) {

	}

	getBeers() {
		return this.http.get<Beer[]>('/api/beer')
		.map(res => res);
	}

	getBeerByID(id: string): Observable<ServerResponseArray> {
		return this.http.get<ServerResponseArray>('/api/beer/' + id);
	}


	getallBears(location_id): Observable<any> {
		return this.http.get(`/api/beer/location/${location_id}`).map(res => res);
	}

	getBear(location_id): Observable<any> {
		console.log('beer id is ', location_id);
		return this.http.get(`/api/beer/${location_id}`).map(res => res);
	}


	addaBear(formData, location_id): Observable<any> {
		const header = new HttpHeaders();
		return this.http.post<any>(`/api/beer/location`, formData,
			{ observe: 'response', responseType: 'json', headers: header })
			 .pipe(map((res) => { console.log(res.body); return res.body; }));
	}

	deleteBeer(beerid, beerlogoid, location_id): Observable<any> {
		const header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
		const form_data = 'beer_logo_id=' + beerlogoid +
		'&location_id=' + location_id;

		return this.http.post<any>(`/api/beer/remove_beer/${beerid}`, form_data,
			{ observe: 'response', responseType: 'json', headers: header })
			 .pipe(map((res) => { console.log(res.body); return res.body; }));
	}

	moveToTap(beerid, location_id): Observable<any> {
		const header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
		const form_data =
		'location_id=' + location_id;

		return this.http.post<any>(`/api/beer/move_to_ontap/${beerid}`, form_data,
			{ observe: 'response', responseType: 'json', headers: header })
			 .pipe(map((res) => { console.log(res.body); return res.body; }));
	}

}
