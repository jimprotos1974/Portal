import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IRequest } from './iRequest';

@Injectable({
  providedIn: 'root',
})

export class DummyRequest implements IRequest {
  constructor(private http: HttpClient) {}

  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body).pipe(
      tap((data: any) => console.log('posted ok!')),
      catchError(this.handleError<any>('post'))
    );
  }

  get(url: string, options?: any): Observable<any> {
    options = options || {};

    options.withCredentials = true;
    options.headers = {
      "Access-Control-Allow-Origin": "http://localhost:8000"
    };
    return this.http.get(url, options).pipe(
      tap((data: any) => console.log('posted ok!')),
      catchError(this.handleError<any>('post'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
