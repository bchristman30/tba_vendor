import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location/location.service';
import { LocationModel } from '../location/location.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { MatSidenav} from '@angular/material/sidenav';
import { BreweryInfo } from '../../services/beweryinfo.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Dialogbox } from '../../dialogbox/dialog.component';
import { MatDialog } from '@angular/material';
import { UIService } from '../../shared/snackbar/Ui.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-maininfo',
  templateUrl: './maininfo.component.html',
  styleUrls: ['./maininfo.component.scss']
})
export class MaininfoComponent implements OnInit {
  locations: Array<LocationModel>;
  locationSub: Subscription = new Subscription();
  events: string[] = [];
  opened: boolean;
  tilecolor: String = '#ccc';
  color: String = '#000';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  location: any;
  bewIfo: any;
  isLoading: Boolean;
  info: any;
  status: any;
  isloadsub: Subscription;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  isAuth: Boolean = false;
  userdata: any;
  location_id: any;


  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private locationService: LocationService,
              private breakpointService: BreakpointService,
              private bewInfo: BreweryInfo,
              public dialog: MatDialog,
              private uiservice: UIService,
              private authService: AuthService,

            ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(resp => {
      this.isAuth = resp.isauth;
      this.issubscription_expired = resp.issubscription_expired;
      this.issubscription = resp.issubscription;
    });

    this.isAuth = this.authService.isLoggedIn();
    if ( this.isAuth ) {
      this.spinner.show();
      this.userdata = JSON.parse(localStorage.getItem('user'));
      this.location_id = this.userdata.location.id;
      this.getInfo();
      this.locations = this.locationService.getLocations();
      this.locationSub = this.locationService.locationsDidChange$.subscribe(l => {
      this.locations = l;
      });
    } else {
       this.router.navigate(['/login']);
    }


  }

  getInfo() {
    this.bewInfo.getBreweryInfo(this.location_id).subscribe(
      data => {this.bewIfo = data.result[0],
      console.log('data is', data),
      this.spinner.hide();
    },
      error => console.log(error),
      () => this.isLoading = false);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialogbox, {
      width: '350px',
      data: { text: this.info, status: this.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
  xLogout() {
    this.authService.logout();
  }

  updateInfo(form: NgForm) {
        const val = form.value;
        console.log('sadsadsad', val);
        const id = this.location_id;
        this.bewInfo.updateInfo(val , id).subscribe(res => {
        if (res.error === false) {
            this.info = res.text;
            this.status = false;
         //   form.reset();
            this.openDialog();
          } else {
            this.info = res.text;
            this.status = true;
            this.uiservice.showsnackbar(res.text, null, 3000);
          }
        }, error => {
          this.info = error;
          this.status = false;
          this.uiservice.showsnackbar(error.message, null, 3000);
        });
    }


  showBreweryList(): void {
    this.spinner.show();
    this.router.navigate(['/search']);
  }

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }

}
