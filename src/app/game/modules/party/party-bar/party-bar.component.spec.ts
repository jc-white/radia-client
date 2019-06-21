import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyBarComponent } from './party-bar.component';

describe('PartyBarComponent', () => {
  let component: PartyBarComponent;
  let fixture: ComponentFixture<PartyBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
