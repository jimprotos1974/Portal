import { Controllers, EndpointFactory } from '../endpoint/endpointFactory';

export let endpoints: Controllers = {
  user: {
    browse: {
      method: 'GET',
      permission: 'Permissions.User.View',
      url: '/users',
    },
    locate: {
      method: 'GET',
      permission: 'Permissions.User.View',
      url: '/users/{id}'
    },
    create: {
      method: 'POST',
      permission: 'Permissions.User.Create',
      url: '/users',
    },
    update: {
      method: 'PUT',
      permission: 'Permissions.User.Edit',
      url: '/users/{id}',
    },
    remove: {
      method: 'DELETE',
      permission: 'Permissions.User.Delete',
      url: '/users/{id}',
    },
  },
  product: {
    browse: {
      method: 'GET',
      permission: 'Permissions.Product.View',
      url: '/products',
    },
    locate: {
      method: 'GET',
      permission: 'Permissions.Product.View',
      url: '/products/{id}',
    },
    create: {
      method: 'POST',
      permission: 'Permissions.Product.Create',
      url: '/products',
    },
    update: {
      method: 'PUT',
      permission: 'Permissions.Product.Edit',
      url: '/products/{id}',
    },
    remove: {
      method: 'DELETE',
      permission: 'Permissions.Company.Delete',
      url: '/products/{id}',
    },
  },
};