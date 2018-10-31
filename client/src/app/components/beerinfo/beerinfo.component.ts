import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatSidenav} from '@angular/material/sidenav';
import { BeerService } from '../../services/beer.service';
import { AuthService } from '../../auth/auth.service';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-beerinfo',
  templateUrl: './beerinfo.component.html',
  styleUrls: ['./beerinfo.component.scss']
})
export class BeerinfoComponent implements OnInit {
  beerid: String = 'default';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];
  isAuth: Boolean = false;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  userdata: any;
  location: any;
  location_id: any;
  beerdata: any;
  isLoading: Boolean;


  constructor(public route: ActivatedRoute,
    private router: Router,
    private beerService: BeerService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private locationService: LocationService,
    private breakpointService: BreakpointService) { }

    ngOnInit() {
       this.route.params.subscribe(result => {
           this.beerid = result['beer'];
            console.log(this.beerid);
      });

      this.authSubscription = this.authService.authChange.subscribe(resp => {
        this.isAuth = resp.isauth;
        this.issubscription_expired = resp.issubscription_expired;
        this.issubscription = resp.issubscription;
      });

      this.isAuth = this.authService.isLoggedIn();

      if ( this.isAuth  && this.beerid) {
        this.spinner.show();
        this.userdata = JSON.parse(localStorage.getItem('user'));
        this.location = this.userdata.location.name;
        this.location_id = this.userdata.location.id;
        this.getBearInfo(this.beerid);
      }  else {
        this.router.navigate(['/login']);
      }

  }

  getBearInfo(beerid) {
    this.beerService.getBear(beerid).subscribe(
      data => {this.beerdata = data.result[0],
        this.spinner.hide(),
      console.log('data beers', data)},
      error => console.log(error),
      () => this.isLoading = false);
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
