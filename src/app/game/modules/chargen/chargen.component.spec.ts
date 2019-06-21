import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargenComponent } from './chargen.component';

describe('ChargenComponent', () => {
  let component: ChargenComponent;
  let fixture: ComponentFixture<ChargenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
