import { Observable, of } from 'rxjs';

export interface IRequest {

  post: (url: string, body: any, options?: any) => Observable<any>;

  get: (url: string, options?: any) => Observable<any>;
  
}
