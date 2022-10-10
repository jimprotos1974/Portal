import { IApi } from './iApi';
import { Observable } from 'rxjs';
import { Live } from './live';

export class Company {
  constructor(private api: Live) {
    this.api = api;
  }

  getEndpoint(action: string, tokens: any = {}) {
    return this.api.getEndpoint('company', action, tokens);
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
