import { Component, OnInit, Input, Inject } from '@angular/core';
import { LocationModel } from '../../location.model';
import { LocationService } from '../../location.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../../../dialogbox/dialog.model';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-location-overview',
  templateUrl: './location-overview.component.html',
  styleUrls: ['./location-overview.component.scss']
})
export class LocationOverviewComponent implements OnInit {
  location: LocationModel;
  stampRedeemed: boolean;
  today: number = Date.now();
  currentUser: User;
  isAuth: boolean = false;
  authSubscription: Subscription;
  issubcription_expired: boolean;
  issubcription: boolean;

  constructor(private locationService: LocationService,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.location = this.locationService.getCurrentLocation();
    this.authSubscription = this.authService.authChange.subscribe(resp => {
      this.isAuth = resp.isauth;
      /*********************************************************************************
       * STAMP REDEEM FACILITY ONLY AVAILABLE AFTER YEARLY MEMBERSHIP *
       * issubscription_expired=true means 'subscription is either exipred or not taken'
       * if subscription is expired then user can not see redeem stamp button
       **********************************************************************************/
      this.issubcription = resp.issubscription;
    });
    this.isAuth = this.authService.isLoggedIn();
    if (this.isAuth) {
      this.authService.Is_subscriprition_expired();
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    this.stampRedeemed = false;
  }

  redeemStamp(): void {
    const dialogRef = this.dialog.open(DialogRedeemStampComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.stampRedeemed = result;
      }
    });
  }
}


@Component({
  selector: 'app-dialog-redeem-stamp',
  templateUrl: 'dialog-redeem-stamp.html',
})
export class DialogRedeemStampComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogRedeemStampComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
