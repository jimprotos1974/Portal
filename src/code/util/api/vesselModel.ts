import { Model } from '../../../pouch/model/model';

export interface Vessel {
  id: number;
  name: string;
  imo: string;
}

export class VesselModel extends Model {
  override fields = [
    {
      name: 'id',
      type: 'int',
    },
    {
      name: 'name',
      type: 'string',
      convert: (value: any, data: any) => {
        return value + ' (Vsl.)';
      },
    },
    {
      name: 'imo',
      type: 'string',
    },
  ];
}
