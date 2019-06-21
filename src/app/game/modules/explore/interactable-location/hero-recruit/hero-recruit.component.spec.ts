import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRecruitComponent } from './hero-recruit.component';

describe('HeroRecruitComponent', () => {
  let component: HeroRecruitComponent;
  let fixture: ComponentFixture<HeroRecruitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroRecruitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroRecruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
