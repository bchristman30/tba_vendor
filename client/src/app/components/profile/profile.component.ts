import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { stampedbrewery } from '../../models/stampedbrewery.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  isAuth: boolean = false;
  authSubscription: Subscription;
  issubscription_expired:boolean;
  issubscription:boolean;
  stampedbrewery: Array<stampedbrewery>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(resp => {
      this.isAuth = resp.isauth;
      this.issubscription_expired = resp.issubscription_expired;
      this.issubscription = resp.issubscription;
    });
    this.isAuth = this.authService.isLoggedIn();
    if (this.isAuth) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.authService.fetch_stamped_brewery(this.currentUser.id).subscribe((res) => {
        console.log('stamped brewery list');
        console.log(res.result);
        this.stampedbrewery = res.result;
      });
    }
  }


}
