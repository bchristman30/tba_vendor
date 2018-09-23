import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Subscription } from 'rxjs';
import { DialogTermsOfServiceComponent } from '../../dialogs/dialog-terms-of-service/dialog-terms-of-service.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-membership-card-info',
  templateUrl: './membership-card-info.component.html',
  styleUrls: ['./membership-card-info.component.scss']
})
export class MembershipCardInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  submitPaymentSub: Subscription;
  currentUser: any;

  constructor(private cd: ChangeDetectorRef,
    private paymentService: PaymentService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Logged user:' + this.currentUser);
  }

  ngOnInit(): void {
    this.paymentService.submitPayment$.subscribe(shouldSubmitPayment => {
      if (shouldSubmitPayment) {
        this.submitPayment();
      }
    });
  }

  ngAfterViewInit() {
    (<any>window).elements = this.paymentService.stripe.elements();
    const style = {
      base: {
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
      }
    };
    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);


    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  viewTermsOfServiceDialog(): void {
    const dialogRef = this.dialog.open(DialogTermsOfServiceComponent, {});
  }

  async submitPayment() {
    this.spinner.show();
    const { token, error } = await this.paymentService.stripe.createToken(this.card);

    if (error) {
      this.toastr.error(error.message, 'Error');
      this.spinner.hide();
    } else {
      this.paymentService.submitStripPayment(token.id,this.currentUser.id).subscribe(resp => {
        if (resp.error) {
          this.toastr.error(resp.text, 'Error');
        } else {
          this.authService.update_user_info(resp);
          this.toastr.success(resp.text, 'Success');
          this.router.navigate(['/upgrade/thank-you']);
        }
        this.spinner.hide();
      });
    }
  }

}
