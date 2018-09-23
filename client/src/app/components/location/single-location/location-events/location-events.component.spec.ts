import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEventsComponent } from './location-events.component';

describe('LocationEventsComponent', () => {
  let component: LocationEventsComponent;
  let fixture: ComponentFixture<LocationEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
