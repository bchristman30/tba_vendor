import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beerinfo',
  templateUrl: './beerinfo.component.html',
  styleUrls: ['./beerinfo.component.scss']
})
export class BeerinfoComponent implements OnInit {
  beername: String = 'default';
  constructor(public route: ActivatedRoute) { }

    ngOnInit() {
       this.route.params.subscribe(result => {
           this.beername = result['beer'];
            console.log(this.beername);
      });
  }

}
