import { Component, OnInit } from '@angular/core';
import { Dummy as DummyApi } from '../../code/api/dummy';
import { ProductInterface } from '../../code/model/product';
import { Product as ProductEntity } from '../../code/entity/product';
import { Product as ProductModel } from '../../code/model/product';
import { Model } from '../../pouch/model/model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  listOfProducts: ProductInterface[] = [];

  constructor(private dummyApi: DummyApi) {
    let entity = new ProductEntity(this.dummyApi);

    /*entity.browse().subscribe((response) => {
      this.listOfProducts = Model.convertList(response.products, ProductModel);
    });*/

    entity.browse()
    .then((response) => {
      this.listOfProducts = Model.convertList(response.products, ProductModel);
    });
  }

  ngOnInit(): void {
  }

}
