import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstopsComponent } from './foodstops.component';

describe('FoodstopsComponent', () => {
  let component: FoodstopsComponent;
  let fixture: ComponentFixture<FoodstopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodstopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodstopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
