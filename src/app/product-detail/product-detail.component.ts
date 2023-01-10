import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dummy as DummyApi } from '../../code/api/dummy';
import { ProductInterface } from '../../code/model/product';
import { Product as ProductModel } from '../../code/model/product';
import { Product as ProductEntity } from '../../code/entity/product';
import { Calculator } from '../../pouch/util/correlated/calculator';
import { Validator } from '../../pouch/util/correlated/validator';

import { calculation } from '../../code/settings/correlation/product/calculation';
import { validation } from '../../code/settings/correlation/product/validation';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements AfterViewInit, OnInit {
  id?: number | undefined;
  fb: any;
  product: ProductInterface | undefined;
  lastValues: any = {};
  calculator!: Calculator;
  validator!: Validator;

  @ViewChild('f') form: any;

  constructor(private route: ActivatedRoute, private api: DummyApi) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lastValues = this.form.value;

    this.calculator = new Calculator(calculation, {
      form: this.form,
    });

    this.validator = new Validator(validation, {
      form: this.form,
    });

    this.form.valueChanges.subscribe((values: any) => {
      const key = Object.keys(values).find(
        (k) => values[k] != this.lastValues[k]
      );

      if (!key) {
        return;
      }

      const oldValue = this.lastValues[key];
      const newValue = values[key];

      this.lastValues = { ...values };

      console.log(
        `last field to change is: ${key}: ${oldValue} to ${newValue}`
      );

      this.calculator.trigger(key!, null);
      this.validator.trigger(key!, null);

      console.log(this.validator);
    });

    let entity = new ProductEntity(this.api);

    entity.locate(this.id).then((response) => {
      console.log(response);

      this.product = new ProductModel(response).convert();
    });
  }

  summarize() {
    if (!this.form) {
      return {};
    }
    return { ...this.product, ...this.form.value };
  }
}
