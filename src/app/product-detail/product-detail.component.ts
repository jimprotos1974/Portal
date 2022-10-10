import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LiveApi } from '../../code/util/api/liveApi';
import { Product } from '../../code/util/api/productModel';
import { ProductModel } from '../../code/util/api/productModel';
import { ProductEntity } from '../../code/util/api/productEntity';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  id?: number | undefined;
  fb: any;
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private liveApi: LiveApi) {

  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new ProductEntity(this.liveApi);

    entity.locate(this.id).subscribe(response => {
      console.log(response)

      this.product = new ProductModel(response).convert();
    });
  }

}
