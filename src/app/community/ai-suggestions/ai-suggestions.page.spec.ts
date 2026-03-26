import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiSuggestionsPage } from './ai-suggestions.page';

describe('AiSuggestionsPage', () => {
  let component: AiSuggestionsPage;
  let fixture: ComponentFixture<AiSuggestionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AiSuggestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
