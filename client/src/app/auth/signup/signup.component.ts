import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dialogbox } from '../../dialogbox/dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/snackbar/Ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  info: any;
  status: any;
  isloading:boolean=false;
  isloadsub:Subscription;

  constructor(public dialog: MatDialog,
     private authService: AuthService,
     private uiservice: UIService) {
    this.info = '';
    this.status = '';
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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

  onSubmit(form: NgForm) {
    if (form.value.cpassword === form.value.password) {
      this.authService.signup(form.value).subscribe(res => {
        if (res.error === false) {
          this.info = res.text;
          this.status = false;
          form.reset();
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
      this.info = 'Confirmation Password should be same.';
      this.status = false;
      this.uiservice.showsnackbar(this.info, null, 3000);
    }
  }

}
