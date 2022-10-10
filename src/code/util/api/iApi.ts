import { IRequest } from './iRequest';

export interface IApi {

  url: string;
  entities: any;

  getCaller: () => IRequest;
  getBaseUrl: () => string;

  getEndpoint: (entity: string, action: string, tokens: any) => any;
  ping: () => boolean;

}
