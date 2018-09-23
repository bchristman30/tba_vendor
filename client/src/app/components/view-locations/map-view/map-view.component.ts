import { Component, OnInit } from '@angular/core';
import { marker } from './marker.model';
import { MouseEvent } from '@agm/core';
import { icondata } from './icondata.model';
import { BottomsheetComponent } from '../../../bottomsheet/bottomsheet.component';
import { MatBottomSheet } from '@angular/material';
import { LocationService } from '../../location/location.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  isTracked: boolean = false;
  isRefreshed: boolean = false;
  isPosition: boolean = false;
  currentLat: number = 37.090240;
  currentLong: number = -95.712891;
  zoom: number = 11;
  icon: icondata = {
    url: 'https://brew-pub-dev.herokuapp.com/static/navigation.png',
    scaledSize: {
      height: 40,
      width: 28
    }
  };
  draggable: boolean = false;
  markers: marker[];
  // markers: marker[] = [
  //   {
  //     id: 3,
  //     lat: 30.316300,
  //     lng: 78.032980,
  //     icon: {
  //       url: 'https://brew-pub-dev.herokuapp.com/static/location/brewery.png',
  //       scaledSize: {
  //         height: 40,
  //         width: 28
  //       }
  //     }
  //   },
  //   {
  //     id: 4,
  //     lat: 30.308601,
  //     lng: 78.971130,
  //     icon: {
  //       url: 'https://brew-pub-dev.herokuapp.com/static/location/brewery2.png',
  //       scaledSize: {
  //         height: 40,
  //         width: 28
  //       }
  //     }
  //   },
  //   {
  //     id: 5,
  //     lat: 30.316623,
  //     lng: 78.053076,
  //     icon: {
  //       url: 'https://brew-pub-dev.herokuapp.com/static/location/brewery.png',
  //       scaledSize: {
  //         height: 40,
  //         width: 28
  //       }
  //     }
  //   }
  // ]

  constructor(private bottomSheet: MatBottomSheet, private locationService: LocationService, private spinner: NgxSpinnerService) { }

  ngOnInit() { }

  openBottomSheet(result) {
    this.spinner.hide();
    let sheet = this.bottomSheet.open(BottomsheetComponent, {
      backdropClass: 'my-backdrop',
      hasBackdrop: true,
      data: {
        result: result
      }
    });
    sheet.backdropClick().subscribe(() => {
      console.log('bd clicked');
    });
    sheet.afterDismissed().subscribe((str) => {
      console.log(str);

    });
  }

  clickedMarker(iconurl) {
    console.log(`clicked the marker:`)
  }
  clickedMarkerloc(label: string, index: string) {
    this.spinner.show();
    this.locationService.fetchLocationByID(index).subscribe((response) => {
      this.openBottomSheet(response.result);
    });

  }

  mapClicked($event: MouseEvent) {
    console.log('Clicked on Map:');
    //console.log('new lat:' + $event.coords.lat);
    //console.log('new long:' + $event.coords.lng);
  }

  findMe(str: string) {

    if (navigator.geolocation) {
      if (str == 'me') {
        this.isPosition = true;
      }
      else
      {
        this.isRefreshed=false;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      this.isPosition = false;
      alert("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position) {
    this.isTracked = true;
    console.log(`current postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.locationService.fetchNearestLocationLatLong(this.currentLat, this.currentLong).subscribe((response) => {
      console.log(response.result);
      this.isPosition = false;
      this.markers = response.result;
    
    });

  }

  refreshMap() {
    this.isRefreshed = true;
    if (this.isTracked == false) {
      this.findMe('refresh');
     
    }
    else {
      this.locationService.fetchNearestLocationLatLong(this.currentLat, this.currentLong).subscribe((response) => {
        console.log(response.result);
        this.markers = response.result;
        this.isRefreshed = false;
      });
    }

  }

  /*************************
   * TRACKING FUNCTION START*
   *************************/
  trackMe() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {

      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking started postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    this.locationService.fetchNearestLocationLatLong(this.currentLat, this.currentLong).subscribe((response) => {
      console.log(response.result);
      this.markers = response.result;
    });
  }
  /*************************
 * TRACKING FUNCTION END*
 *************************/

}
