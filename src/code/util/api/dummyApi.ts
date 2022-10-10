import { Injectable } from '@angular/core';
import { DummyRequest } from './dummyRequest';
import { IApi } from './iApi';

@Injectable({
  providedIn: 'root',
})

export class DummyApi implements IApi{
  caller: DummyRequest;
  url: string = 'https://dummyjson.com';

  private normalizedEntities: any = {};

  constructor(caller: DummyRequest) {
    this.caller = caller;
    this.normalizedEntities = this.normalizeEntities();
  }

  entities: any = {
    product: {
      browse: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/products',
      },
      locate: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/products/{id}',
      },
      create: {
        method: 'POST',
        permission: 'Permissions.Company.Create',
        url: '/products',
      },
      update: {
        method: 'PUT',
        permission: 'Permissions.Company.Edit',
        url: '/products/{id}',
      },
      remove: {
        method: 'DELETE',
        permission: 'Permissions.Company.Delete',
        url: '/products/{id}',
      },
    },
  };

  getCaller(): DummyRequest {
    return this.caller;
  }

  getBaseUrl(): string {
    return this.url;
  }

  normalizeEntities(): any {
    let normalized: any = {};

    for (let aName in this.entities) {
      normalized[aName.toLowerCase()] = this.entities[aName];
    }

    return normalized;
  }

  getEntityEndpoints(entity: string): any {
    entity = entity || '';
    entity = entity.toLowerCase();

    return this.entities[entity];
  }

  getEndpoint(entity: string, action: string, tokens: any = {}) {
    let endpoints = this.getEntityEndpoints(entity),
      pick = endpoints && endpoints[action];

    if (!pick) {
      return;
    }

    pick = {
      ...pick,
      url: this.getSolidUrl(this.getBaseUrl() + pick.url, tokens),
    };

    return pick;
  }

  getSolidUrl(url: string = '', tokens: any = {}) {
    for (let aName in tokens) {
      url = url.replace(new RegExp('{' + aName + '}', 'gi'), tokens[aName]);
    }

    return url;
  }

  getUrl(): string {
    return this.url;
  }

  ping(): boolean {
    return true;
  }
}
