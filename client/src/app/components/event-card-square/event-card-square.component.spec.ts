import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardSquareComponent } from './event-card-square.component';

describe('EventCardSquareComponent', () => {
  let component: EventCardSquareComponent;
  let fixture: ComponentFixture<EventCardSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCardSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
