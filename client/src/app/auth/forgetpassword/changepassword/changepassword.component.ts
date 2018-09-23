import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Dialogbox } from '../../../dialogbox/dialog.component';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  userid: any;
  info: any;
  token: any;
  status:any;

  constructor(private activeRoute: ActivatedRoute,  private router: Router,public dialog: MatDialog, private AuthService: AuthService) { }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    //console.log('queryParams' + queryParams.id);
   // console.log('queryParams' + queryParams.token);
    this.userid = queryParams.id;
    this.token = queryParams.token;
    this.info = "";
    this.status="";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialogbox, {
      width: '350px',
      data: { text: this.info,status:this.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);

    });
  }

  onSubmit(form: NgForm) {
    form.value.userid = this.userid;
    form.value.token = this.token;
    if (form.value.cpassword == form.value.newpassword) {
      this.AuthService.updatepassword(form.value).subscribe(res => {
        console.log(res.text);
        if (res.error == false) {
          this.info = res.text;
          this.status=false;
          this.openDialog();
          this.router.navigateByUrl('/');

        }
        else {
          this.info = res.text;
          this.status=true;
          this.openDialog();
          
        }

       
      }, error => {
        this.info = error;
        this.status=false;
        this.openDialog();
      });
    }
    else {
      this.info = "Password should be same";
      this.status=false;
      this.openDialog();
    }
  }
}
