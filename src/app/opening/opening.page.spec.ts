import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpeningPage } from './opening.page';

describe('OpeningPage', () => {
  let component: OpeningPage;
  let fixture: ComponentFixture<OpeningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
