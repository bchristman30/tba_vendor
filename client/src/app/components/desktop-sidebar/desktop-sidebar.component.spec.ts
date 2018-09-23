import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSidebarComponent } from './desktop-sidebar.component';

describe('DesktopSidebarComponent', () => {
  let component: DesktopSidebarComponent;
  let fixture: ComponentFixture<DesktopSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
