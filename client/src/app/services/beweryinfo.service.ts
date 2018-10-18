import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Beer } from '../models/beer.model';
import { ServerResponseArray } from '../models/server-request-array.model';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BreweryInfo {
	constructor(private http: HttpClient) {

	}

	getBreweryInfo(): Observable<any> {
     return this.http.get(`/api/location/3`).map(res => res);
	}

	getBeerByID(id: string): Observable<ServerResponseArray> {
		return this.http.get<ServerResponseArray>('/api/beer/' + id);
	}
}
