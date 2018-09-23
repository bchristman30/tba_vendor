import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCardInfoComponent } from './membership-card-info.component';

describe('MembershipCardInfoComponent', () => {
  let component: MembershipCardInfoComponent;
  let fixture: ComponentFixture<MembershipCardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipCardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
