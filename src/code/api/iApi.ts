import { IRequest } from '../request/iRequest';

export interface IApi {

  baseUrl: string;

  getCaller: () => IRequest;
  getBaseUrl: () => string;

  getEndpoint: (entity: string, action: string, tokens: any) => any;
  ping: () => Promise<boolean>;

}
