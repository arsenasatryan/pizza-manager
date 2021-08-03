import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewOrderRoutingModule} from './new-order-routing.module';
import {NewOrderComponent} from './new-order/new-order.component';
import {BasicInformationFormComponent} from './basic-information-form/basic-information-form.component';
import {PizzaOptionsComponent} from './pizza-options/pizza-options.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbAccordionModule, NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {NewOrderService} from './services/new-order.service';


@NgModule({
  declarations: [
    NewOrderComponent,
    BasicInformationFormComponent,
    PizzaOptionsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    SharedModule,
    NgbButtonsModule,
  ],
  providers: [
    NewOrderService,
  ]
})
export class NewOrderModule {
}
