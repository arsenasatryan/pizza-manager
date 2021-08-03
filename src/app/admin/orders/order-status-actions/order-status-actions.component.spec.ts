import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderStatusActionsComponent} from './order-status-actions.component';

describe('OrderStatusActionsComponent', () => {
  let component: OrderStatusActionsComponent;
  let fixture: ComponentFixture<OrderStatusActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderStatusActionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
