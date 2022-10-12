import { Model } from '../../pouch/model/model';

export interface CoordinatesInterface {
  lat: string,
  lng: string
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