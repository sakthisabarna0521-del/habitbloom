import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreaksPage } from './streaks.page';

describe('StreaksPage', () => {
  let component: StreaksPage;
  let fixture: ComponentFixture<StreaksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StreaksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
