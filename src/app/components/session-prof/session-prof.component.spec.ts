import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionProfComponent } from './session-prof.component';

describe('SessionProfComponent', () => {
  let component: SessionProfComponent;
  let fixture: ComponentFixture<SessionProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionProfComponent]
    });
    fixture = TestBed.createComponent(SessionProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
