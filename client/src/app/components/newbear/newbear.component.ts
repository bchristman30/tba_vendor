import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UIService } from '../../shared/snackbar/Ui.service';
import { AuthService } from '../../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BeerService } from '../../services/beer.service';
import { Subscription } from 'rxjs';
import { Dialogbox } from '../../dialogbox/dialog.component';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-newbear',
  templateUrl: './newbear.component.html',
  styleUrls: ['./newbear.component.scss']
})
export class NewbearComponent implements OnInit {
  beername: String = 'default';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoading: Boolean;
  info: any;
  status: any;
  isloadsub: Subscription;
  authSubscription: Subscription;
  issubscription_expired: boolean;
  issubscription: boolean;
  isAuth: Boolean = false;
  userdata: any;
  location_id: any;
  price: String = '';
  density: String = '';
  alchohol_content: String = '';
  name: String = '';
  beer_description: String = '';
  filelink: any;
  imageis: any;
  x = [1];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  constructor(private authService: AuthService,
    private beerService: BeerService,
    private spinner: NgxSpinnerService, private uiservice: UIService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(resp => {
      this.isAuth = resp.isauth;
      this.issubscription_expired = resp.issubscription_expired;
      this.issubscription = resp.issubscription;
    });

    this.isAuth = this.authService.isLoggedIn();
    if (this.isAuth) {
      this.userdata = JSON.parse(localStorage.getItem('user'));
      this.location_id = this.userdata.location.id;
    }

  }


  imageUpload(e) {
    console.log('sasd');
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      this.filelink = file;
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
  addBear(form: NgForm) {
    const val = form.value;
    console.log('sadsadsad', val);
    console.log('filelink', this.filelink);
    if (this.filelink) {
      console.log('console', this.filelink);
      const formData: any = new FormData();
      formData.append('beer_logo', this.filelink);
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('alchohol_content', this.alchohol_content);
      formData.append('beer_description', this.beer_description);
      formData.append('location_id', 3);
      formData.append('category', this.x);

      const headers = new Headers();
      this.beerService.addaBear(formData, this.location_id).subscribe(res => {
        if (res.error === false) {
          this.info = res.text;
          this.status = false;
          //   form.reset();
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
      console.log('s');
      this.uiservice.showsnackbar('Plaese select an image', null, 3000);

    }

  }



}

