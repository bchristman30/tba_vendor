import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipThankYouComponent } from './membership-thank-you.component';

describe('MembershipThankYouComponent', () => {
  let component: MembershipThankYouComponent;
  let fixture: ComponentFixture<MembershipThankYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipThankYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
