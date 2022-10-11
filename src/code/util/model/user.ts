import { Model } from '../../../pouch/model/model';

export interface CoordinatesInterface {
    lat: string,
    lng: string
}

export interface AddressInterface {
    address: string,
    city: string,
    postalCode: string,
    state: string,
    coordinates: CoordinatesInterface
}

export interface CompanyInterface {
    address: AddressInterface,
    department: string,
    name: string,
    title: string
}

export interface HairInterface {
    color: string,
    type: string
}

export interface BankInterface {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string
}



export class Coordinates extends Model {
  override fields = [
    {
      name: 'lat',
      type: 'string',
      convert: (value: any, data: any) => {
        return "lat: " + value;
      }
    },
    {
      name: 'lng',
      type: 'string',
      convert: (value: any, data: any) => {
        return "lng: " + value;
      }
    },
  ]
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

export class Hair extends Model {
  override fields = [
    {
      name: 'color',
      type: 'string',
    },
    {
      name: 'type',
      type: 'string',
    },
  ];
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
      convert: (value: any, data: any) => {
        return 'cd: ' + value;
      },
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
  hair: HairInterface,
  domain: string,
  ip: string,
  address: AddressInterface,
  macAddress: string,
  university: string,
  bank: BankInterface,
  company: CompanyInterface,
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

  override hasOne = [{
    name : 'company',
    model : Company
  },{
    name : 'address',
    model : Address
  },{
    name : 'hair',
    model : Hair
  },{
    name : 'bank',
    model : Bank
  }]
}
