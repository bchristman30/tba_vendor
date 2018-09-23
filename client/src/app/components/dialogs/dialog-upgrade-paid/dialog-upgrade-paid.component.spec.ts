import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpgradePaidComponent } from './dialog-upgrade-paid.component';

describe('DialogUpgradePaidComponent', () => {
  let component: DialogUpgradePaidComponent;
  let fixture: ComponentFixture<DialogUpgradePaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpgradePaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpgradePaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
