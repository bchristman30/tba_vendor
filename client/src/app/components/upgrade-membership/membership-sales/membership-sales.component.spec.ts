import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSalesComponent } from './membership-sales.component';

describe('MembershipSalesComponent', () => {
  let component: MembershipSalesComponent;
  let fixture: ComponentFixture<MembershipSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
