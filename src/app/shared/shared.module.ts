import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './components/loading/loading.component';
import {NgbSortableHeader} from './directives/sortable.directive';
import {TimeAgoPipe} from './pipes/time-ago.pipe';


@NgModule({
  declarations: [
    LoadingComponent,
    NgbSortableHeader,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    NgbSortableHeader,
    TimeAgoPipe
  ]
})
export class SharedModule {
}
