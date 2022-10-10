import { Model } from '../../../pouch/model/model';

export interface Company {
  id: number;
  name: string;
  code: string;
  city: string;
  address: string;
  postalCode: string;
  phoneNumbers: string;
  logo: string;
}

export class CompanyModel extends Model {
  override fields = [
    {
      name: 'id',
      type: 'int',
    },
    {
      name: 'code',
      type: 'string',
      convert: (value: any, data: any) => {
        return value + ' (Co.)';
      },
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'city',
      type: 'string',
    },
    {
      name: 'address',
      type: 'string',
    },
    {
      name: 'postalCode',
      type: 'string',
    },
    {
      name: 'phoneNumbers',
      type: 'string',
    },
  ];
}
