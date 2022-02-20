import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardsHomeComponent } from './view-cards-home.component';

describe('ViewCardsHomeComponent', () => {
  let component: ViewCardsHomeComponent;
  let fixture: ComponentFixture<ViewCardsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCardsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
