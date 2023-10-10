import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSessionComponent } from './liste-session.component';

describe('ListeSessionComponent', () => {
  let component: ListeSessionComponent;
  let fixture: ComponentFixture<ListeSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSessionComponent]
    });
    fixture = TestBed.createComponent(ListeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
