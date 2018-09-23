import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckCalendarComponent } from './food-truck-calendar.component';

describe('FoodTruckCalendarComponent', () => {
  let component: FoodTruckCalendarComponent;
  let fixture: ComponentFixture<FoodTruckCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTruckCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTruckCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
