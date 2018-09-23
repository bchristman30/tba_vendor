import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../models/beer.model';
import { ServerResponseArray } from '../models/server-request-array.model';
import { Observable } from 'rxjs/Observable';

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
}
