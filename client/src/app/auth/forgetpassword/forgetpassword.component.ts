import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Dialogbox } from '../../dialogbox/dialog.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  info: any;
  status: any;

  constructor(public dialog: MatDialog, private AuthService: AuthService) {
    this.info = '';
    this.status = '';
   }

  ngOnInit() {
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
      this.AuthService.forgetpassword(form.value).subscribe(res => {
        console.log(res.text);
        if (res.error === false) {
          this.info = res.text;
          this.status = false;
          form.resetForm();
        } else {
          this.info = res.text;
          this.status = true;
        }
        this.openDialog();
      }, error => {
        this.info = error;
        this.status = false;
        this.openDialog();
      });
  }
}
