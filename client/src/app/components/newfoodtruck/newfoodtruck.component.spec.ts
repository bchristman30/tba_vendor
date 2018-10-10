import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfoodtruckComponent } from './newfoodtruck.component';

describe('NewfoodtruckComponent', () => {
  let component: NewfoodtruckComponent;
  let fixture: ComponentFixture<NewfoodtruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfoodtruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfoodtruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
