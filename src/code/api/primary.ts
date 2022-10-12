import { Injectable } from '@angular/core';
import { Primary as PrimaryRequest } from '../request/primary';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})

export class Primary extends Api{
  override url: string = 'https://portal.capitalshipmanager.com:18095';
  override entities: any = {
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

  constructor(caller: PrimaryRequest) {
    super(caller);
  }

  override ping(): Promise<boolean> {
    return new Promise(resolve => resolve (false));
  }
}
