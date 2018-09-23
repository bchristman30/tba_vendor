import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class UIService{

   isloadingstatus=new Subject<boolean>();
  constructor(public snackBar: MatSnackBar) {}

  showsnackbar(message,action,duration){
    let snackBarRef= this.snackBar.open(message,action,{
         duration:duration
     });
   
  }
 
}