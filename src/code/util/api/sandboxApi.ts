import { Injectable } from '@angular/core';
import { LiveRequest } from './liveRequest';
import { IApi } from './iApi';

@Injectable({
  providedIn: 'root',
})

export class SandboxApi implements IApi{
  caller: LiveRequest;
  url: string = '../../../sandbox';

  private normalizedEntities: any = {};

  constructor(caller: LiveRequest) {
    this.caller = caller;
    this.normalizedEntities = this.normalizeEntities();
  }

  entities: any = {
    company: {
      browse: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/api/companies/list.json',
      },
      locate: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/api/companies/{id}.json',
      },
    },

    vessel: {
      browse: {
        method: 'GET',
        permission: 'Permissions.Vessel.View',
        url: '/api/vessels/list.json',
      },
      locate: {
        method: 'GET',
        permission: 'Permissions.Vessel.View',
        url: '/api/vessels/{id}.json',
      },
    },

    authorize: {
      login: {
        method: 'POST',
        permission: null,
        url: '/api/authorize/login.json',
      },
    },
  };

  getCaller(): LiveRequest {
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
