import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { VesselComponent } from './vessel/vessel.component';
import { VesselDetailComponent } from './vessel-detail/vessel-detail.component';
import { ProductComponent } from './product/product.component';

import { GarbageComponent } from './garbage/garbage.component';

const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'vessel', component: VesselComponent },
  { path: 'vessel/:id', component: VesselDetailComponent },
  { path: 'product', component: ProductComponent },
  /*{ path: '**', component: GarbageComponent }*/
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
