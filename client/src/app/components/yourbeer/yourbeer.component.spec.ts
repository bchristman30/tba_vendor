import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourbeerComponent } from './yourbeer.component';

describe('YourbeerComponent', () => {
  let component: YourbeerComponent;
  let fixture: ComponentFixture<YourbeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourbeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourbeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
