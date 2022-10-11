import { Model } from '../../../pouch/model/model';

export interface VesselInterface {
  id: number;
  name: string;
  imo: string;
}

export class Vessel extends Model {
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
