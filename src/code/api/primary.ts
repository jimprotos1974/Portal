import { Injectable } from '@angular/core';
import { Api } from './api';

import { Primary as PrimaryRequest } from '../request/primary';
import { Dummy as DummyEndpointFactory } from '../endpoint/dummy';

@Injectable({
  providedIn: 'root',
})

export class Primary extends Api{
  override baseUrl: string = 'https://portal.capitalshipmanager.com:18095';

  constructor(caller: PrimaryRequest, endpointFactory: DummyEndpointFactory) {
    super(caller, endpointFactory);
  }

  override ping(): Promise<boolean> {
    return new Promise(resolve => resolve (false));
  }
}
