import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpsuitsComponent } from './jumpsuits.component';

describe('JumpsuitsComponent', () => {
  let component: JumpsuitsComponent;
  let fixture: ComponentFixture<JumpsuitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JumpsuitsComponent]
    });
    fixture = TestBed.createComponent(JumpsuitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
