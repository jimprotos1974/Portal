import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { VesselComponent } from './vessel/vessel.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  
  { path: 'vessel', component: VesselComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
