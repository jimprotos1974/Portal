import { Model } from '../../pouch/model/model';

export interface BankInterface {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
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
  ];
}

