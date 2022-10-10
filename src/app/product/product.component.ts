import { Component, OnInit } from '@angular/core';
import { DummyApi } from '../../code/util/api/dummyApi';
import { Product } from '../../code/util/api/productModel';
import { Product as ProductEntity } from '../../code/util/api/product';

import { Model } from '../../pouch/model/model';
import { ProductModel } from '../../code/util/api/productModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  listOfProducts: Product[] = [];

  constructor(private dummyApi: DummyApi) {
    let entity = new ProductEntity(this.dummyApi);

    entity.browse().subscribe((response) => {
      this.listOfProducts = Model.convertList(response.products, ProductModel);
    });
  }

  ngOnInit(): void {
  }

}
