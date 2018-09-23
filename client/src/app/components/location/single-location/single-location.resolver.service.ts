import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocationService } from '../location.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ServerResponseArray } from '../../../models/server-request-array.model';
import { isNullOrUndefined } from 'util';
import { LocationCalendarEvent } from '../location.model';

@Injectable()
export class SingleLocationResolver implements Resolve<ServerResponseArray> {
    constructor(private locationService: LocationService) {}

    // tslint:disable-next-line:max-line-length
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerResponseArray>|Promise<ServerResponseArray>|ServerResponseArray {
        const locationID: string = route.params['id'];
        return this.locationService.fetchLocationByID(locationID);
    }
}
