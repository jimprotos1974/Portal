import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { lastValueFrom } from 'rxjs';

import { IRequest } from './iRequest';

@Injectable({
  providedIn: 'root',
})

export class Primary implements IRequest {
  constructor(private http: HttpClient) {}

  get(url: string, options?: any): Promise<any> {
    options = {
      withCredentials: true
    };

    return lastValueFrom(this.http.get(url, options));
  }

  post(url: string, body: any, options?: any): Promise<any> {    
    options = {
      withCredentials: true
    };

    return lastValueFrom(this.http.post(url, body, options));
  }

  put(url: string, body: any, options?: any): Promise<any> {    
    options = {
      withCredentials: true
    };
    
    return lastValueFrom(this.http.put(url, body, options));
  }

  delete(url: string, options?: any): Promise<any> {    
    options = {
      withCredentials: true
    };
    
    return lastValueFrom(this.http.delete(url, options));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
