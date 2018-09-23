import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLocationDesktopComponent } from './single-location-desktop.component';

describe('SingleLocationDesktopComponent', () => {
  let component: SingleLocationDesktopComponent;
  let fixture: ComponentFixture<SingleLocationDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLocationDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLocationDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
