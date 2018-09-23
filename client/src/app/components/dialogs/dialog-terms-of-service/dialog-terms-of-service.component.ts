import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../../dialogbox/dialog.model';

@Component({
  selector: 'app-dialog-terms-of-service',
  templateUrl: './dialog-terms-of-service.component.html',
  styleUrls: ['./dialog-terms-of-service.component.scss']
})
export class DialogTermsOfServiceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogTermsOfServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
