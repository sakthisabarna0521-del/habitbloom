import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalRankingPage } from './global-ranking.page';

describe('GlobalRankingPage', () => {
  let component: GlobalRankingPage;
  let fixture: ComponentFixture<GlobalRankingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalRankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
