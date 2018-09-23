import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckMenuComponent } from './food-truck-menu.component';

describe('FoodTruckMenuComponent', () => {
  let component: FoodTruckMenuComponent;
  let fixture: ComponentFixture<FoodTruckMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTruckMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTruckMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
