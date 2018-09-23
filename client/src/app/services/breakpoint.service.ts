import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable()
export class BreakpointService {
    mobile: boolean;
    constructor(public breakpointObserver: BreakpointObserver) {
        this.init();
    }

    init(): void {
        this.breakpointObserver
            .observe(['(min-width: 650px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobile = false;
                } else {
                    this.mobile = true;
                }
            });
    }

    isMobile(): boolean {
        return this.mobile;
    }
}
