import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerinfoComponent } from './beerinfo.component';

describe('BeerinfoComponent', () => {
  let component: BeerinfoComponent;
  let fixture: ComponentFixture<BeerinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
