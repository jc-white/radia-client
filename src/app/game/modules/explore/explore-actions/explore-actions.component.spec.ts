import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreActionsComponent } from './explore-actions.component';

describe('ExploreActionsComponent', () => {
  let component: ExploreActionsComponent;
  let fixture: ComponentFixture<ExploreActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
