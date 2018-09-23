import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../../dialogbox/dialog.model';

@Component({
  selector: 'app-dialog-upgrade-paid',
  templateUrl: './dialog-upgrade-paid.component.html',
  styleUrls: ['./dialog-upgrade-paid.component.scss']
})
export class DialogUpgradePaidComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogUpgradePaidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
