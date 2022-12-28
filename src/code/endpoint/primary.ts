import { Injectable } from '@angular/core';
import { Controllers, EndpointFactory } from './endpointFactory';

import { PrimaryEndpoints } from '../settings/primary';

@Injectable({
  providedIn: 'root',
})

export class Primary extends EndpointFactory{
  override baseUrl: string = 'https://portal.capitalshipmanager.com:18095';
  override controllers: Controllers = PrimaryEndpoints;
}
