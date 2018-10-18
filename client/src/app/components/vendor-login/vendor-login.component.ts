import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthConstants } from '../../auth/auth.constants';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Dialogbox } from '../../dialogbox/dialog.component';
import { MatDialog } from '@angular/material';
import { UIService } from '../../shared/snackbar/Ui.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.scss']
})
export class VendorLoginComponent implements OnInit, OnDestroy {
  info: any;
  status: any;
  isloading: Boolean = false;
  isloadsub: Subscription;


  constructor(  private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private uiservice: UIService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkQueryParams();
    this.isloadsub = this.uiservice.isloadingstatus.subscribe((status) => {
      this.isloading = status;
    });
  }

  private checkQueryParams() {
  const errorParam = this.activatedRoute.snapshot.queryParams.error;
  if (!isNullOrUndefined(errorParam)) {
    if (errorParam === AuthConstants.NOT_AUTHENTICATED) {
      setTimeout(() => this.toastr.error('User not logged in.', 'Error'));
    }
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


login(form: NgForm) {
  const val = form.value;
  if (val.email && val.password) {
    this.authService.login(val.email, val.password)
      .subscribe(
        (resp: any) => {
          console.log('resp:');
           console.log(resp);
          if (resp.error === false) {
            this.info = resp.text;
            this.status = false;
            this.authService.setSession(resp);
             this.router.navigateByUrl('/home');
             this.openDialog();
          } else {
            this.info = resp.text;
            this.status = true;
            this.uiservice.showsnackbar(resp.text, null, 3000);
          }

        },
        (error: any) => {
          this.info = error;
          this.status = false;
          this.uiservice.showsnackbar(error.message, null, 3000);

        }
      );
  }
}

ngOnDestroy() {
  this.isloadsub.unsubscribe();
}

}
