import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectionCardComponent } from './category-selection-card.component';

describe('CategorySelectionCardComponent', () => {
  let component: CategorySelectionCardComponent;
  let fixture: ComponentFixture<CategorySelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySelectionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
