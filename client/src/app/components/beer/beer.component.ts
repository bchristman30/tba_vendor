import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../models/beer.model';
import { ActivatedRoute, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerResponseArray } from '../../models/server-request-array.model';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {
	beer: Beer;
	  constructor(private beerService: BeerService,
		private route: ActivatedRoute,
		private spinner: NgxSpinnerService) { }

  	ngOnInit() {
		this.spinner.hide();
        this.route.data
        .subscribe(
            (data: Data) => {
                const beerResult: ServerResponseArray = data['beer'];
                this.beer = beerResult.result[0];
            }
        );
  	}

}
