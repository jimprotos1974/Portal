import { Injectable } from '@angular/core';
import { Dummy as DummyRequest } from '../request/dummy';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})

export class Dummy extends Api{
  override url: string = 'https://dummyjson.com';
  override entities: any = {
    product: {
      browse: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/products',
      },
      locate: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/products/{id}',
      },
      create: {
        method: 'POST',
        permission: 'Permissions.Company.Create',
        url: '/products',
      },
      update: {
        method: 'PUT',
        permission: 'Permissions.Company.Edit',
        url: '/products/{id}',
      },
      remove: {
        method: 'DELETE',
        permission: 'Permissions.Company.Delete',
        url: '/products/{id}',
      },
    },
  };

  constructor(caller: DummyRequest) {
    super(caller);
  }

  override ping(): Promise<boolean> {
    return new Promise(resolve => resolve (false));
  }
}
