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
};