import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamificationPage } from './gamification.page';

describe('GamificationPage', () => {
  let component: GamificationPage;
  let fixture: ComponentFixture<GamificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
