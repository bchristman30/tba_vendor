import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../shared/interfaces/nav-item.interface';
import { PaymentService } from '../../services/payment.service';
import { NavigationStart, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  bottomNav: Array<NavItem>;
  showSubmit: boolean;
  showNext: boolean;

  constructor(private paymentService: PaymentService,
              private router: Router) {}

  ngOnInit(): void {
    this.showNext = false;
    this.showNext = false;

    this.bottomNav = [
      {icon: 'home', label: 'Home', link: 'home'},
      {icon: 'search', label: 'Breweries', link: 'search'},
      {icon: 'person', label: 'Profile', link: 'user'}
    ];

    this.router.events
      .subscribe((event: NavigationStart) => {
        if (!isNullOrUndefined(event.url)) {
          if ( event.url === '/upgrade/card-info') {
            this.showSubmit = true;
            this.showNext = false;
          } else if ( event.url === '/upgrade/why-upgrade' || event.url === '/upgrade' ) {
            this.showSubmit = false;
            this.showNext = true;
          } else {
            this.showSubmit = false;
            this.showNext = false;
          }
        }
      });
  }

  showDefaultNav(): boolean {
    return (!this.showNext && !this.showSubmit);
  }

  submitPayment(): void {
    this.paymentService.submitNextPayment(true);
  }

}
