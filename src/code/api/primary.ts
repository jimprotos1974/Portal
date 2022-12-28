import { Injectable } from '@angular/core';
import { Primary as PrimaryRequest } from '../request/primary';
import { Api } from './api';
import { Primary as PrimaryEndpointFactory } from '../endpoint/primary';

@Injectable({
  providedIn: 'root',
})

export class Primary extends Api{
  override baseUrl: string = 'https://portal.capitalshipmanager.com:18095';

  constructor(caller: PrimaryRequest, endpointFactory: PrimaryEndpointFactory) {
    super(caller, endpointFactory);
  }

  override ping(): Promise<boolean> {
    return new Promise(resolve => resolve (false));
  }
}
