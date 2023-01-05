import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dummy as DummyApi } from '../../code/api/dummy';
import { ProductInterface } from '../../code/model/product';
import { Product as ProductModel } from '../../code/model/product';
import { Product as ProductEntity } from '../../code/entity/product';

import {
  FormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  id?: number | undefined;
  fb: any;
  product: ProductInterface | undefined;

  constructor(private route: ActivatedRoute, private api: DummyApi) {

  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new ProductEntity(this.api);

    entity.locate(this.id)
    .then(response => {
      console.log(response)

      this.product = new ProductModel(response).convert();
    });
  }

}
