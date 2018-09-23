import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class HeaderService {
    showDefaultLogo: boolean;
    showDefaultLogo$: Subject<boolean>;

    constructor() {
        this.init();
    }

    init(): void {
        this.showDefaultLogo = true;
        this.showDefaultLogo$ = new Subject<boolean>();
    }

    updateshowDefaultLogo(hide: boolean) {
        this.showDefaultLogo = hide;
        this.showDefaultLogo$.next(this.showDefaultLogo);
    }
}
