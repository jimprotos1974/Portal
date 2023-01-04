import { Controllers, EndpointFactory } from '../endpoint/endpointFactory';

export let PrimaryEndpoints: Controllers = {
  authorize : {
    login : {
      method     : 'POST',
      permission : '',
      url        : '/api/authorize/login'
    },
    login2FA : {
      method     : 'POST',
      permission : '',
      url        : '/api/authorize/login2fa'
    },
    refresh : {
      method     : 'POST',
      permission : '',
      url        : '/api/authorize/refresh'
    },
    logoutUser   : {
      method     : 'POST',
      permission : '',
      url        : '/api/authorize/logoutuser'
    },
    logout   : {
      method     : 'POST',
      permission : '',
      url        : '/api/authorize/logout'
    }
  },
  vessel : {
    browse : {
      method     : 'GET',
      permission : 'Permissions.Vessel.View',
      url        : '/api/vessels'
    },
    locate : {
      method     : 'GET',
      permission : 'Permissions.Vessel.View',
      url        : '/api/vessels/{id}'
    },
    create : {
      method     : 'POST',
      permission : 'Permissions.Vessel.Create',
      url        : '/api/vessels'
    },
    update : {
      method     : 'PUT',
      permission : 'Permissions.Vessel.Edit',
      url        : '/api/vessels/{id}'
    },
    remove : {
      method     : 'DELETE',
      permission : 'Permissions.Vessel.Delete',
      url        : '/api/vessels/{id}'
    },
    filter : {
      method     : 'POST',
      permission : 'Permissions.Vessel.View',
      url        : '/api/vessels/filter'
    },
  },
};