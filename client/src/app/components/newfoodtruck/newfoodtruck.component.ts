import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newfoodtruck',
  templateUrl: './newfoodtruck.component.html',
  styleUrls: ['./newfoodtruck.component.scss']
})
export class NewfoodtruckComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  favoriteSeason: string;
  seasons: string[] = ['Not a single day'];

}
     