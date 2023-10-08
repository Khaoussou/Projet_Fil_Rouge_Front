import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationSessionComponent } from './planification-session.component';

describe('PlanificationSessionComponent', () => {
  let component: PlanificationSessionComponent;
  let fixture: ComponentFixture<PlanificationSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificationSessionComponent]
    });
    fixture = TestBed.createComponent(PlanificationSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
