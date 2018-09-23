import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermsOfServiceComponent } from './dialog-terms-of-service.component';

describe('DialogTermsOfServiceComponent', () => {
  let component: DialogTermsOfServiceComponent;
  let fixture: ComponentFixture<DialogTermsOfServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTermsOfServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
