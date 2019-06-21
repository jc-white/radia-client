import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWindowHostComponent } from './game-window-host.component';

describe('GameWindowHostComponent', () => {
  let component: GameWindowHostComponent;
  let fixture: ComponentFixture<GameWindowHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWindowHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWindowHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
