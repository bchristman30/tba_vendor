import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UIService } from '../../shared/snackbar/Ui.service';
import { BeerService } from '../../services/beer.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Dialogbox } from '../../dialogbox/dialog.component';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.scss'],

})
export class NeweventComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Not a single day'];
  eventname: String = '';
  startdate: any;
  enddate: any;
  starttime: any = '19:15:00';
  closetime: any = '21:15:00';
  filelink: any;
  myDate: any;
  info: any;
  status: any;
  userdata: any;
  location_id: any;
  closeDate: any;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  isAuth: Boolean = false;
  constructor( private datePipe: DatePipe,     public dialog: MatDialog
,    private beerService: BeerService, private authService: AuthService,
    private uiservice: UIService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(resp => {
      this.isAuth = resp.isauth;
      this.issubscription_expired = resp.issubscription_expired;
      this.issubscription = resp.issubscription;
    });

    this.isAuth = this.authService.isLoggedIn();
    if (this.isAuth) {
      this.userdata = JSON.parse(localStorage.getItem('user'));
      this.location_id = this.userdata.location.id;
    }
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


  addEvents(form: NgForm) {
    const val = form.value;
    const start = this.startdate + ' ' + this.starttime;
    const close = this.enddate + ' ' + this.closetime;
    if (this.filelink) {
      const formData: any = new FormData();
      formData.append('feature_image', this.filelink);
      formData.append('name', this.eventname);
      formData.append('start_date', start);
      formData.append('end_date', close);
      formData.append('location_id', 3);
      const headers = new Headers();
      this.beerService.addaEvent(formData, this.location_id).subscribe(res => {
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
    } else {
      console.log('s');
      this.uiservice.showsnackbar('Plaese select an image', null, 3000);
    }
  }


  updateMyDate(newDate) {
    this.myDate = newDate;
    this.startdate =   this.datePipe.transform(this.myDate, 'yyyy:MM:dd');

  }

  UpdateClose(s) {
    this.closeDate = s;
    this.enddate =   this.datePipe.transform(this.closeDate, 'yyyy:MM:dd');
  }

  imageUpload(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      this.filelink = file;
    }
  }


}

