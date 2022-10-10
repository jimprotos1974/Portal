import { Entity } from './entity';

import { Observable, of } from 'rxjs';

export class Master extends Entity{

  browse(options?: any): Observable<any> {
    let endpoint = this.getEndpoint('browse');

    return this.api.getCaller().get(endpoint.url, options);
  }

}
