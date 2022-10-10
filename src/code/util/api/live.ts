import { Injectable } from '@angular/core';
import { LiveRequest } from './liveRequest';
import { IApi } from './iApi';

@Injectable({
  providedIn: 'root',
})

export class Live implements IApi{
  caller: LiveRequest;
  url: string = 'https://portal.capitalshipmanager.com:18095';

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
        url: '/api/accounts/companies',
      },
      locate: {
        method: 'GET',
        permission: 'Permissions.Company.View',
        url: '/api/accounts/companies/{id}',
      },
      create: {
        method: 'POST',
        permission: 'Permissions.Company.Create',
        url: '/api/accounts/companies',
      },
      update: {
        method: 'PUT',
        permission: 'Permissions.Company.Edit',
        url: '/api/accounts/companies/{id}',
      },
      remove: {
        method: 'DELETE',
        permission: 'Permissions.Company.Delete',
        url: '/api/accounts/companies/{id}',
      },
      filter: {
        method: 'POST',
        permission: 'Permissions.Company.View',
        url: '/api/accounts/companies/filter',
      },
    },

    vessel: {
      browse: {
        method: 'GET',
        permission: 'Permissions.Vessel.View',
        url: '/api/vessels',
      },
      locate: {
        method: 'GET',
        permission: 'Permissions.Vessel.View',
        url: '/api/vessels/{id}',
      },
      create: {
        method: 'POST',
        permission: 'Permissions.Vessel.Create',
        url: '/api/vessels',
      },
      update: {
        method: 'PUT',
        permission: 'Permissions.Vessel.Edit',
        url: '/api/vessels/{id}',
      },
      remove: {
        method: 'DELETE',
        permission: 'Permissions.Vessel.Delete',
        url: '/api/vessels/{id}',
      },
      filter: {
        method: 'POST',
        permission: 'Permissions.Vessel.View',
        url: '/api/vessels/filter',
      },
    },

    authorize: {
      login: {
        method: 'POST',
        permission: null,
        url: '/api/authorize/login',
      },
      login2FA: {
        method: 'POST',
        permission: null,
        url: '/api/authorize/login2fa',
      },
      refresh: {
        method: 'POST',
        permission: null,
        url: '/api/authorize/refresh',
      },
      logoutUser: {
        method: 'POST',
        permission: null,
        url: '/api/authorize/logoutuser',
      },
      logout: {
        method: 'POST',
        permission: null,
        url: '/api/authorize/logout',
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
