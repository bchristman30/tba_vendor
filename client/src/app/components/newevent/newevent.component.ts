import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.scss'],
  
})
export class NeweventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  favoriteSeason: string;
  seasons: string[] = ['Not a single day'];
}

