import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleOverviewComponent } from './puzzle-overview.component';

describe('PuzzleOverviewComponent', () => {
  let component: PuzzleOverviewComponent;
  let fixture: ComponentFixture<PuzzleOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
