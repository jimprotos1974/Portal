import { Entity } from './entity';

import { Observable, of } from 'rxjs';

export class Authorize extends Entity {
  override key = 'authorize';

	login(username:string, password: string): Promise<any>{
		let endpoint = this.getEndpoint('login'),
      body = {
				userName : username,
				password : password
			}
		
		return this.post(endpoint.url, body);
	}
}