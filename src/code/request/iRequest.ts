import { Observable, of } from 'rxjs';

export interface IRequest {

  get: (url: string, options?: any) => Promise<any>;

  post: (url: string, body: any, options?: any) => Promise<any>;

  put: (url: string, body: any, options?: any) => Promise<any>;

  delete: (url: string, options?: any) => Promise<any>;
  
}
