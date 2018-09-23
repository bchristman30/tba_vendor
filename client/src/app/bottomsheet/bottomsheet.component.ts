import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.scss']
})
export class BottomsheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  ngOnInit() {
  }
  
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  myaction(str:string){
    this.bottomSheetRef.dismiss(str);
  }
}
