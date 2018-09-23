import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {Location} from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { DialogUpgradePaidComponent } from '../dialogs/dialog-upgrade-paid/dialog-upgrade-paid.component';
import { MatDialog } from '@angular/material';
import { isNullOrUndefined, isUndefined } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth:boolean = false;  // BYDEFAULT
  authSubscription: Subscription;
  hideBack: boolean;
  currentUser:any;
  issubscription_expired:boolean;
  issubscription:boolean;
  constructor(private authService: AuthService,
              private location: Location,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {

    this.authSubscription = this.authService.authChange.subscribe(resp => {
      console.log(resp);
      this.isAuth = resp.isauth;
      this.issubscription_expired=resp.issubscription_expired;
      this.issubscription=resp.issubscription;
    });
    this.isAuth = this.authService.isLoggedIn();
    if(this.isAuth)
    {
      this.authService.Is_subscriprition_expired();
    }
    this.router.events
      .subscribe((event: NavigationStart) => {
        if (!isUndefined(event.url)) {
          if ( event.url === '/' || event.url === '/home') {
            this.hideBack = true;
          } else {
            this.hideBack = false;
          }
        }
      });
  }

  upgradeToPaid(): void {
    const dialogRef = this.dialog.open(DialogUpgradePaidComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        if (result) {
          this.router.navigate(['/upgrade/']);
        }
      }
    });
  }

  openprofilepage():void{
    this.router.navigate(['/user']);
  }
  onLogout() {
    this.authService.logout();
  }

  backAction(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
