import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbearComponent } from './newbear.component';

describe('NewbearComponent', () => {
  let component: NewbearComponent;
  let fixture: ComponentFixture<NewbearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
