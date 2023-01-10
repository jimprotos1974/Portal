import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dummy as DummyApi } from '../../code/api/dummy';
import { ProductInterface } from '../../code/model/product';
import { Product as ProductModel } from '../../code/model/product';
import { Product as ProductEntity } from '../../code/entity/product';
import { Calculator } from '../../pouch/util/correlated/calculator';

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
  lastValues: any = {};
  calculator!: Calculator;

  @ViewChild('f') form: any;

  constructor(private route: ActivatedRoute, private api: DummyApi) {

  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lastValues = this.form.value;

    this.calculator = new Calculator(
      {
        extra: {
          path: 'extra',
          func: function (calculator: any, rule: any, params: any, meta: any) {
            console.log(calculator);
            console.log(rule);
            console.log(params.form.value);

            /*params.form.control.patchValue({
            "extra": "ddp"
          });*/
          },
          dependencies: ['description', 'id'],
        },
      },
      {
        form: this.form,
      }
    );

    this.form.valueChanges.subscribe((values: any) => {
      const key = Object.keys(values).find(
        (k) => values[k] != this.lastValues[k]
      );
      const oldValue = key ? this.lastValues[key] : null;
      const newValue = key ? values[key] : null;

      this.lastValues = { ...values };

      console.log(
        `last field to change is: ${key}: ${oldValue} to ${newValue}`
      );

      this.calculator.trigger(key!, null);
    });

    let entity = new ProductEntity(this.api);

    entity.locate(this.id).then((response) => {
      console.log(response);

      this.product = new ProductModel(response).convert();
    });
  }

}
