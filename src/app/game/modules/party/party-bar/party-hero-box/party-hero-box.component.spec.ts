import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHeroBoxComponent } from './party-hero-box.component';

describe('PartyHeroBoxComponent', () => {
  let component: PartyHeroBoxComponent;
  let fixture: ComponentFixture<PartyHeroBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyHeroBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyHeroBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
