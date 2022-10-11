import { Model } from '../../../pouch/model/model';

export interface BankInterface {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string
}

export class Bank extends Model {
  override fields = [
    {
      name: 'cardExpire',
      type: 'string',
    },
    {
      name: 'cardNumber',
      type: 'string',
    },
    {
      name: 'cardType',
      type: 'string',
    },
    {
      name: 'currency',
      type: 'string',
    },
    {
      name: 'iban',
      type: 'string',
    },
  ]
}

export interface UserInterface {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: Date,
  image: string,
  bloodGroup: string,
  height: number,
  weight: number,
  eyeColor: string,
  hair: object,
  domain: string,
  ip: string,
  address: object,
  macAddress: string,
  university: string,
  bank: object,
  company: object,
  ein: string,
  ssn: string,
  userAgent: string
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
      name: 'hair',//*
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
      name: 'address',//*
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
      name: 'bank',//*
      type: 'auto',
    },
    {
      name: 'company',//*
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

  /*override hasOne = [{
    bank : Bank
  }]*/
}
