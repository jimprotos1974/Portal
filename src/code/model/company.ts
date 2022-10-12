import { Model } from '../../pouch/model/model';

import { Address } from './address';
import { AddressInterface } from './address';

export interface CompanyInterface {
  address: AddressInterface,
  department: string,
  name: string,
  title: string
}

export class Company extends Model {
override fields = [
  {
    name: 'department',
    type: 'string',
  },
  {
    name: 'name',
    type: 'string',
  },
  {
    name: 'title',
    type: 'string',
  },
];

override hasOne = [{
  name : 'address',
  model : Address
}]
}