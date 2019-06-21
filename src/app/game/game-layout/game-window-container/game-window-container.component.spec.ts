import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWindowContainerComponent } from './game-window-container.component';

describe('GameWindowContainerComponent', () => {
  let component: GameWindowContainerComponent;
  let fixture: ComponentFixture<GameWindowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWindowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWindowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
