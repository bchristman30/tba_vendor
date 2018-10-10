import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import { ActivatedRoute } from '@angular/router';


export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-beerinfo',
  templateUrl: './beerinfo.component.html',
  styleUrls: ['./beerinfo.component.scss']
})
export class BeerinfoComponent implements OnInit {
  beername: String = 'default';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
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

  constructor(public route: ActivatedRoute) { }

    ngOnInit() {
       this.route.params.subscribe(result => {
           this.beername = result['beer'];
            console.log(this.beername);
      });
  }

}
