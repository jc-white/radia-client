import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitLabelComponent } from './trait-label.component';

describe('TraitLabelComponent', () => {
  let component: TraitLabelComponent;
  let fixture: ComponentFixture<TraitLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
