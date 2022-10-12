import { Model } from '../../pouch/model/model';

export interface HairInterface {
  color: string,
  type: string
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