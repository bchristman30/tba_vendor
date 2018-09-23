import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ServerResponseSingle } from '../models/server-request-single.model';

@Injectable()
export class PaymentService {
    stripe = (<any>window).Stripe('pk_test_R41M277l0vr0vg6XJA6COXqV'); // use your test publishable key
    submitPayment$: Subject<boolean>;

    constructor(private http: HttpClient) {
        this.init();
    }

    init(): void {
        this.submitPayment$ = new Subject<boolean>();
    }

    submitNextPayment(submitPayment: boolean): void {
        this.submitPayment$.next(submitPayment);
    }

    submitStripPayment(token: string,user_id:string): Observable<ServerResponseSingle> {
        const options = {stripeToken: token,user_id:user_id};
        return this.http.post<ServerResponseSingle>('/api/payment/', options);
    }
}
