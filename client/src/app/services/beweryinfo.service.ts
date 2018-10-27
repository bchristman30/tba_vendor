import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Beer } from '../models/beer.model';
import { ServerResponseArray } from '../models/server-request-array.model';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
const httpOptions = {
	headers: new HttpHeaders({
		'content-type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*'
	})
};


@Injectable()
export class BreweryInfo {
	dataList: any = [];

	constructor(private http: HttpClient) {

	}

	getBreweryInfo(location_id): Observable<any> {
		return this.http.get(`/api/location/${location_id}`).map(res => res);
	}


	getUpEvents(location_id): Observable<any> {
		return this.http.get(`/api/location/calendar/${location_id}`).map(res => res);
	}

	getBeerByID(id: string): Observable<ServerResponseArray> {
		return this.http.get<ServerResponseArray>('/api/beer/' + id);
	}

	updateInfo(formData, location_id): Observable<any> {
		const header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
		const form_data = 'name=' + formData.name +
			'&phone=' + formData.phone +
			'&support_email=' + formData.support_email
			+ '&website_url=' + formData.website_url +
			'&city=' + formData.city + '&state=' + formData.state
			+ '&zipcode=' + formData.zipcode + '&address=' + formData.address
			;
		return this.http.post<any>(`/api/location/update_basicinfo/${location_id}`, form_data,
			{ observe: 'response', responseType: 'json', headers: header })
			.pipe(map((res) => { console.log(res.body); return res.body; }));
	}


	updateInfoHr(formData, location_id): Observable<any> {
<<<<<<< HEAD
		const header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');


		const xarray = [
			{
			'Monday': {
			'opening_hour': formData.mon_open,
			'closing_hour': formData.mon_close,
			'isclose': formData.mon_status
			}
=======
		const header = new HttpHeaders().set('content-type', 'application/json').append('Access-Control-Allow-Origin', '*');
		const xarray = {
			"data": [{
				"Monday": {
					"opening_hour": formData.mon_open,
					"closing_hour": formData.mon_close,
					"isclose": formData.mon_status
				}
>>>>>>> 6bf43c878164c1c4fb268cc20b8fcc1b9f882463
			},
			{
				"Tuesday": {
					"opening_hour": formData.tue_open,
					"closing_hour": formData.tue_close,
					"isclose": formData.tue_status
				}
			},
			{
				"Wednesday": {
					"opening_hour": formData.wed_open,
					"closing_hour": formData.wed_close,
					"isclose": formData.wed_status
				}
			},
			{
				"Thursday": {
					"opening_hour": formData.thu_open,
					"closing_hour": formData.thu_close,
					"isclose": formData.thu_status
				}
			},
			{
				"Friday": {
					"opening_hour": formData.fri_open,
					"closing_hour": formData.fri_close,
					"isclose": formData.fri_status
				}
			},
			{
				"Saturday": {
					"opening_hour": formData.sat_open,
					"closing_hour": formData.sat_close,
					"isclose": formData.sat_status
				}
			},
			{
<<<<<<< HEAD
			'Sunday': {
				'opening_hour': formData.sun_open,
				'closing_hour': formData.sun_close,
				'isclose': formData.sun_status
			}
			}
			];

		const data =  'data=' + JSON.stringify(xarray);
		return this.http.post<any>(`/api/location/update_workinghours/${location_id}`, data,
		{ observe: 'response', responseType: 'json', headers: header })
		.pipe(map((res) => { console.log(res.body); return res.body; }));
=======
				"Sunday": {
					"opening_hour": formData.sun_open,
					"closing_hour": formData.sun_close,
					"isclose": formData.sun_status
				}
			}]
		};
		//const data = JSON.stringify(xarray);
		//const data = JSON.stringify(xarray);
		//console.log('array is', data);
		return this.http.post<any>(`/api/location/update_workinghours/${location_id}`, xarray,
			{ observe: 'response', responseType: 'json', headers: header })
			.pipe(map((res) => { console.log(res.body); return res.body; }));
>>>>>>> 6bf43c878164c1c4fb268cc20b8fcc1b9f882463
	}

}
