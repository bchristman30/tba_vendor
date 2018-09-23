import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../../../models/beer.model';
import { AppConstants } from '../../../shared/constants/app-constants';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {
  @Input() beer: Beer;
  defaultLocationFallback: string;
  constructor() { }

  ngOnInit() {
  }

}
