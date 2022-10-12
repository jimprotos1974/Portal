import { Model } from '../../pouch/model/model';

import { Hair } from './hair';
import { HairInterface } from './hair';

import { Coordinates } from './coordinates';
import { CoordinatesInterface } from './coordinates';

import { Address } from './address';
import { AddressInterface } from './address';

import { Company } from './company';
import { CompanyInterface } from './company';

import { Bank } from './bank';
import { BankInterface } from './bank';

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: Date;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HairInterface;
  domain: string;
  ip: string;
  address: AddressInterface;
  macAddress: string;
  university: string;
  bank: BankInterface;
  company: CompanyInterface;
  ein: string;
  ssn: string;
  userAgent: string;
}

export class User extends Model {
  override fields = [
    {
      name: 'id',
      type: 'int',
    },
    {
      name: 'firstName',
      type: 'string',
    },
    {
      name: 'lastName',
      type: 'string',
    },
    {
      name: 'maidenName',
      type: 'string',
    },
    {
      name: 'age',
      type: 'int',
    },
    {
      name: 'gender',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'phone',
      type: 'string',
    },
    {
      name: 'username',
      type: 'string',
    },
    {
      name: 'password',
      type: 'string',
    },
    {
      name: 'birthDate',
      type: 'date',
    },
    {
      name: 'image',
      type: 'date',
    },
    {
      name: 'bloodGroup',
      type: 'date',
    },
    {
      name: 'height',
      type: 'number',
    },
    {
      name: 'weight',
      type: 'number',
    },
    {
      name: 'eyeColor',
      type: 'string',
    },
    {
      name: 'hair', //*
      type: 'auto',
    },
    {
      name: 'domain',
      type: 'string',
    },
    {
      name: 'ip',
      type: 'string',
    },
    {
      name: 'address', //*
      type: 'auto',
    },
    {
      name: 'macAddress',
      type: 'string',
    },
    {
      name: 'university',
      type: 'string',
    },
    {
      name: 'bank', //*
      type: 'auto',
    },
    {
      name: 'company', //*
      type: 'auto',
    },
    {
      name: 'ein',
      type: 'string',
    },
    {
      name: 'ssn',
      type: 'string',
    },
    {
      name: 'userAgent',
      type: 'string',
    },
  ];

  override hasOne = [
    {
      name: 'company',
      model: Company,
    },
    {
      name: 'address',
      model: Address,
    },
    {
      name: 'hair',
      model: Hair,
    },
    {
      name: 'bank',
      model: Bank,
    },
  ];
}
