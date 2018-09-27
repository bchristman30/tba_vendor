import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { LocationModel } from './components/location/location.model';
import { LocationService } from './components/location/location.service';

@Injectable()
export class StartupService {

  constructor(  private httpClient: HttpClient,
                private locationService: LocationService) { }

  initializeApp(): Promise<any> | any {
    return null; // why?
//     return this.httpClient.get<LocationModel[]>('/api/location')
//         .toPromise()
//         .then(
//             (data: Array<LocationModel>) => {
//                 this.locationService.setLocations(data);
//             }
//         );
  }
}
