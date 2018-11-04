import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxnewComponent } from './dialogboxnew.component';

describe('DialogboxnewComponent', () => {
  let component: DialogboxnewComponent;
  let fixture: ComponentFixture<DialogboxnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogboxnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogboxnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
