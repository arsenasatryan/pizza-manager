import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'new-order', pathMatch: 'full'},
  {path: 'new-order', loadChildren: () => import('./new-order/new-order.module').then(m => m.NewOrderModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
