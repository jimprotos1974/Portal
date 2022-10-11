import { Observable } from 'rxjs';
import { Api } from './api';

export class ProductEntity {
  constructor(private api: Api) {
    this.api = api;
  }

  getEndpoint(action: string, tokens: any = {}) {
    return this.api.getEndpoint('product', action, tokens);
  }

  browse(): Observable<any> {
    let endpoint = this.getEndpoint('browse');

    return this.api.getCaller().get(endpoint.url);
  }

  locate(id: number): Observable<any> {
    let endpoint = this.getEndpoint('locate', { id: id });

    return this.api.getCaller().get(endpoint.url);
  }
}