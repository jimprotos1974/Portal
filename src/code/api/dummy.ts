import { Injectable } from '@angular/core';
import { Dummy as DummyRequest } from '../request/dummy';
import { Api } from './api';
import { Dummy as DummyEndpointFactory } from '../endpoint/dummy';

@Injectable({
  providedIn: 'root',
})

export class Dummy extends Api{
  override baseUrl: string = 'https://dummyjson.com';

  constructor(caller: DummyRequest, endpointFactory: DummyEndpointFactory) {
    super(caller, endpointFactory);
  }

  override ping(): Promise<boolean> {
    return new Promise(resolve => resolve (false));
  }
}
