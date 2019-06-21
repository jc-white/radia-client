import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWindowComponent } from './item-window.component';

describe('ItemWindowComponent', () => {
  let component: ItemWindowComponent;
  let fixture: ComponentFixture<ItemWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
