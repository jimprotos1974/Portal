import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IRequest } from './iRequest';

@Injectable({
  providedIn: 'root',
})

export class Primary implements IRequest {
  constructor(private http: HttpClient) {}

  get(url: string, options?: any): Observable<any> {
    options = {
      withCredentials: true
    };

    return this.http.get(url, options).pipe(
      tap((data: any) => console.log('got ok!')),
      catchError(this.handleError<any>('get'))
    );
  }

  post(url: string, body: any, options?: any): Observable<any> {    
    options = {
      withCredentials: true
    };

    return this.http.post(url, body, options).pipe(
      tap((data: any) => console.log('posted ok!')),
      catchError(this.handleError<any>('post'))
    );
  }

  put(url: string, body: any, options?: any): Observable<any> {    
    options = {
      withCredentials: true
    };
    
    return this.http.put(url, body, options).pipe(
      tap((data: any) => console.log('put ok!')),
      catchError(this.handleError<any>('put'))
    );
  }

  delete(url: string, options?: any): Observable<any> {    
    options = {
      withCredentials: true
    };
    
    return this.http.delete(url, options).pipe(
      tap((data: any) => console.log('deleted ok!')),
      catchError(this.handleError<any>('delete'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
