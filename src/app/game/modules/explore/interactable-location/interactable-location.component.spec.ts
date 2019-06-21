import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractableLocationComponent } from './interactable-location.component';

describe('InteractableLocationComponent', () => {
  let component: InteractableLocationComponent;
  let fixture: ComponentFixture<InteractableLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractableLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractableLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
