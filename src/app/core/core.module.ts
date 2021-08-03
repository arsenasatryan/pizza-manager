import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {RouterModule} from "@angular/router";
import {BaseUrlInterceptor} from './services/base-url.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastComponent} from './components/toast/toast.component';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {GlobalErrorHandler} from './services/global-error-hanlder.service';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ToastComponent
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ]
})
export class CoreModule {
}
