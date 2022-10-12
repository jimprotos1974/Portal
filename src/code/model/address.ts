import { Model } from '../../pouch/model/model';

import { Coordinates } from './coordinates';
import { CoordinatesInterface } from './coordinates';

export interface AddressInterface {
  address: string,
  city: string,
  postalCode: string,
  state: string,
  coordinates: CoordinatesInterface
}

export class Address extends Model {
override fields = [
  {
    name: 'address',
    type: 'string',
  },
  {
    name: 'city',
    type: 'string',
  },
  {
    name: 'postalCode',
    type: 'string',
  },
  {
    name: 'state',
    type: 'string',
  },
];

override hasOne = [{
  name : 'coordinates',
  model : Coordinates
}]
}