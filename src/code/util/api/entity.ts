import { IApi } from './iApi';

import { Observable, of } from 'rxjs';

export class Entity {
  key: string = '';

  constructor(protected api: IApi) {
    this.api = api;
  }

  getEndpoint(action: string, tokens: any = {}) {
    return this.api.getEndpoint(this.key, action, tokens);
  }

  get(options?: any): Observable<any> {
    let endpoint = this.getEndpoint('browse');

    return this.api.getCaller().get(endpoint.url, options);
  }
}
