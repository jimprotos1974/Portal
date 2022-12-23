import { Injectable } from '@angular/core';
import { Controllers, EndpointFactory } from './endpointFactory';

import { endpoints } from '../settings/endpoints';

@Injectable({
  providedIn: 'root',
})

export class Dummy extends EndpointFactory{
  override baseUrl: string = 'https://dummyjson.com';
  override controllers: Controllers = endpoints;
}
