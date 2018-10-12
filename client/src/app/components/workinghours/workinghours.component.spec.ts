import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkinghoursComponent } from './workinghours.component';

describe('WorkinghoursComponent', () => {
  let component: WorkinghoursComponent;
  let fixture: ComponentFixture<WorkinghoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkinghoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkinghoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
