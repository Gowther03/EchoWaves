import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportswearComponent } from './sportswear.component';

describe('SportswearComponent', () => {
  let component: SportswearComponent;
  let fixture: ComponentFixture<SportswearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportswearComponent]
    });
    fixture = TestBed.createComponent(SportswearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
