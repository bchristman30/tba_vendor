import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthConstants } from '../auth.constants';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Dialogbox } from '../../dialogbox/dialog.component';
import { MatDialog } from '@angular/material';
import { UIService } from '../../shared/snackbar/Ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  info: any;
  status: any;
  isloading: boolean = false;
  isloadsub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private uiservice: UIService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkQueryParams();
    this.isloadsub=this.uiservice.isloadingstatus.subscribe((status)=>{
      this.isloading=status;
    });
   
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

  private checkQueryParams(): void {
    const errorParam = this.activatedRoute.snapshot.queryParams.error;
    if (!isNullOrUndefined(errorParam)) {
      if (errorParam === AuthConstants.NOT_AUTHENTICATED) {
        setTimeout(() => this.toastr.error('User not logged in.', 'Error'));
      }
    }
  }

  login(form: NgForm) {
    const val = form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          (resp: any) => {
            //console.log('resp:');
            //console.log(resp);
            if (resp.error === false) {
              this.info = resp.text;
              this.status = false;
              this.authService.setSession(resp);
               this.router.navigateByUrl('/user');
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
            //this.openDialog();
            this.uiservice.showsnackbar(error.message, null, 3000);

          }
        );
    }
  }

  ngOnDestroy(){
    this.isloadsub.unsubscribe();
  }
}
