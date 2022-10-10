import { IApi } from './iApi';
import { Observable} from 'rxjs';
import { Live } from './live';



export class Authorize {
  constructor(private api: Live) {
    this.api = api;
  }

  getEndpoint(action: string, tokens: any = {}): any {
    return this.api.getEndpoint('authorize', action, tokens);
  }

  login(username: string, password: string): Observable<any> {
    let endpoint = this.getEndpoint('login');

    let data = {
      userName: username,
      password: password,
    };

    return this.api.getCaller().post(endpoint.url, data);
  }
  
}
