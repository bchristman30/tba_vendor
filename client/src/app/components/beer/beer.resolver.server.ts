import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ServerResponseArray } from '../../models/server-request-array.model';
import { BeerService } from '../../services/beer.service';

@Injectable()
export class BeerResolver implements Resolve<ServerResponseArray> {
    constructor(private beerService: BeerService) {}

    // tslint:disable-next-line:max-line-length
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerResponseArray>|Promise<ServerResponseArray>|ServerResponseArray {
        const locationID: string = route.params['id'];
        return this.beerService.getBeerByID(locationID);
    }
}
