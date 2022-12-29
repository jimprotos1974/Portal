import { Component, OnInit } from '@angular/core';

import { Primary as PrimaryApi } from '../../code/api/primary';
import { Authorize as AuthorizeEntity } from '../../code/entity/authorize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: {
    username: string;
    password: string;
  } = {
    username: 'ddp',
    password: '!123456789aA',
  };

  constructor(private primaryApi: PrimaryApi) {}

  ngOnInit(): void {
    this.credentials = {
      username: 'ddp',
      password: '!123456789aA',
    };
  }

  login(): void {
    let entity = new AuthorizeEntity(this.primaryApi);

    entity
      .login(this.credentials.username, this.credentials.password)
      .subscribe((response) => {
        //this.listOfProducts = Model.convertList(response.products, ProductModel);
      });
  }
}
