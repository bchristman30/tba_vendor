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
import { FormControl } from '@angular/forms';

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
  beerstyles: any;
  x = [1];
  toppings = new FormControl();
  toppingList: string[] = [];
  tags: string[] = [];
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
      this.spinner.show();
      this.getBeerStyles();
      this.userdata = JSON.parse(localStorage.getItem('user'));
      this.location_id = this.userdata.location.id;
      if (this.beerstyles) {
        console.log('sahbjb', this.beerstyles);
        for (let i = 1; i <= this.beerstyles.length; i++) {
          this.toppingList.push(this.beerstyles[i].type);
        }
      }
    }

  }



  getBeerStyles() {
    this.beerService.getBeerStyles().subscribe(
      data => {
      this.beerstyles = data.result,
        this.fc(),
        console.log('data is', data)
      },
      error => console.log(error),
      () => this.isLoading = false);

  }
  imageUpload(e) {
    console.log('sasd');
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      this.filelink = file;
    }
  }

  fc() {
    for (let i = 1; i <= this.beerstyles.length; i++) {
      if (this.beerstyles[i]) {
        this.toppingList.push(this.beerstyles[i].type);
      }
    }
    this.spinner.hide();

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


  xsz (s) {
  this.toppings.value.forEach(function(obj, index) {
    if ( s.type === obj) {
      this.tags.push(s.id);
}
}, this);
}

  xcs() {
  const  x = [];
  this.beerstyles.forEach(function(obj, index) {
    console.log('before transform, this : ' + this);
    console.log('before transform, this : ' + obj.type);
   this.xsz(obj);
}, this);


  // if (this.beerstytagsles) {
  //   for (let i = 1; i <= this.beerstyles.length; i++) {
  //     console.log('sdad', i);
  //     if (this.toppings) {
  //        this.toppings.value.forEach(function (entry) {
  //          if ( this.beerstyles[i]) {
  //          if (this.beerstyles[i].type === entry) {
  //            console.log('sa', entry);
  //          }
  //         }
  //     });
  //   }
  //  }
  // }
}
  addBear(form: NgForm) {
    const val = form.value;
    console.log('sadsadsad', val);
    console.log('filelink selected', this.toppings.value);

    //     if ( this.toppings) {
    //     this.toppings.value.forEach(function(entry) {
    //       console.log(entry);
    //       if ( this.beerstyles.length > 0 ) {
    //         for ( let i = 1; i <= this.beerstyles.length; i++) {
    //           if (this.beerstyles[i] ) {
    //             if ( this.beerstyles[i].type === entry) {
    //               this.tags.push(this.beerstyles[i].id);
    //             }
    //           }
    //        }
    //       }
    //   });
    // }

 this.xcs();

    console.log('tags', this.tags);
    if (this.filelink) {
      console.log('console', this.filelink);
      const formData: any = new FormData();
      formData.append('beer_logo', this.filelink);
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('Alchohol_content', this.alchohol_content);
      formData.append('beer_description', this.beer_description);
      formData.append('location_id', 3);
      formData.append('category', this.tags);
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

