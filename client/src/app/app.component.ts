import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreakpointService } from './services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private breakpointService: BreakpointService) {}

  ngOnInit() {
  }

  isMobile(): boolean {
    return this.breakpointService.isMobile();
  }
}
