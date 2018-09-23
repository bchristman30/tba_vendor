import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckOverviewComponent } from './food-truck-overview.component';

describe('FoodTruckOverviewComponent', () => {
  let component: FoodTruckOverviewComponent;
  let fixture: ComponentFixture<FoodTruckOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTruckOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTruckOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
