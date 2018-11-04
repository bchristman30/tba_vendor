import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from './dialog.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialogboxnew',
  templateUrl: './dialogboxnew.component.html',
  styleUrls: ['./dialogboxnew.component.scss']
})
export class DialogboxnewComponent implements OnInit {
  mnButtons: any;
  mon_status: String;
  constructor(
    public dialogRef: MatDialogRef<DialogboxnewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseCancel() {
      this.dialogRef.close('confirm');
  }

  ngOnInit() {
  }

}
