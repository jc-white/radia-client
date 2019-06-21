import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyStatusPanelComponent } from './party-status-panel.component';

describe('PartyStatusPanelComponent', () => {
  let component: PartyStatusPanelComponent;
  let fixture: ComponentFixture<PartyStatusPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyStatusPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
