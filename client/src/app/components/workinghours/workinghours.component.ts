import { Component, OnInit } from '@angular/core';
import { BreweryInfo } from '../../services/beweryinfo.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Dialogbox } from '../../dialogbox/dialog.component';
import { UIService } from '../../shared/snackbar/Ui.service';

@Component({
  selector: 'app-workinghours',
  templateUrl: './workinghours.component.html',
  styleUrls: ['./workinghours.component.scss']
})
export class WorkinghoursComponent implements OnInit {
  panelOpenState = false;
  bewIfoHours: any;
  monHours: any;
  tueHours: any;
  wedHours: any;
  thurHours: any;
  friHours: any;
  satHours: any;
  sunHours: any;
  isLoading: Boolean;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  isAuth: Boolean = false;
  userdata: any;
  location_id: any;
  info: any;
  status: any;
  tuButton: any= '0';
  tuButtons: any= '1';
  mnButton: any= '0';
  mnButtons: any= '1';
  frButton: any= '0';
  frButtons: any= '1';
  thButton: any= '0';
  thButtons: any= '1';
  wdButton: any= '0';
  wdButtons: any= '1';
  saButton: any= '0';
  saButtons: any= '1';
  suButton: any= '0';
  suButtons: any= '1';
  constructor(private bewInfo: BreweryInfo, private authService: AuthService, private router: Router,
        private spinner: NgxSpinnerService, public dialog: MatDialog, private uiservice: UIService
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

    }  else {
      this.router.navigate(['/login']);
   }


  }

  getInfo() {
         this.bewInfo.getBreweryInfo(this.location_id).subscribe(
                data => {this.bewIfoHours = data.result[0].location_hours,
                this.monHours = data.result[0].location_hours[0],
                this.tueHours = data.result[0].location_hours[1],
                this.wedHours = data.result[0].location_hours[2],
                this.thurHours = data.result[0].location_hours[3],
                this.friHours = data.result[0].location_hours[4],
                this.satHours = data.result[0].location_hours[5],
                this.sunHours = data.result[0].location_hours[6],
                this.spinner.hide(),
                console.log('working hours is', this.bewIfoHours)},
                error => console.log(error),
                () => this.isLoading = false);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( Dialogbox, {
      width: '350px',
      data: { text: this.info, status: this.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }


  updateInfoHr(form: NgForm) {
    const val = form.value;
    console.log('sadsadsad', val);
    const id = this.location_id;
    this.bewInfo.updateInfoHr(val , id).subscribe(res => {
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
  }


