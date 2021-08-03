import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PizzaOptionsComponent} from './pizza-options.component';

describe('PizzaOptionsComponent', () => {
  let component: PizzaOptionsComponent;
  let fixture: ComponentFixture<PizzaOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaOptionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
