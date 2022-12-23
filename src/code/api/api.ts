import { IRequest } from '../request/iRequest';
import { IApi } from './iApi';
import { Controllers, EndpointFactory } from '../endpoint/endpointFactory';

export abstract class Api implements IApi{
  abstract baseUrl: string;

  caller: IRequest;
  endpointFactory: EndpointFactory

  constructor(caller: IRequest, endpointFactory: EndpointFactory) {
    this.caller = caller;
    this.endpointFactory = endpointFactory;
  }

  getCaller(): IRequest {
    return this.caller;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  abstract ping(): Promise<boolean>

  getEndpoint(entity: string, action: string, tokens: any = {}) {
    return this.endpointFactory.getEndpoint(entity, action, tokens);
  }
}
