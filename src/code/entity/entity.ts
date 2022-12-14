import { Observable, of } from 'rxjs';
import { IApi } from '../api/iApi';
import { IRequest } from '../request/iRequest';

export abstract class Entity {
  abstract key: string;

  constructor(private api: IApi) {
    this.api = api;
  }

  getEndpoint(action: string, tokens: any = {}) {
    return this.api.getEndpoint(this.key, action, tokens);
  }

  get(url:string, options?: any): Promise<any> {
    let caller: IRequest = this.api.getCaller();

    return caller.get(url, options);
  }

  post(url:string, body:any, options?: any): Promise<any> {
    let caller: IRequest = this.api.getCaller();

    return caller.post(url, body, options);
  }

  browse(): Promise<any> {
    let endpoint: any = this.getEndpoint('browse');

    return this.get(endpoint.url);
  }

  locate(id: number): Promise<any> {
    let endpoint: any = this.getEndpoint('locate', { id: id });

    return this.get(endpoint.url);
  }
}
