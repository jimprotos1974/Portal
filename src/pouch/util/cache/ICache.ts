export type CacheItem = {
  insertedTicks : number;
  expiresTicks : number;
  version : string;
  value : any
};

export interface ICache{
  get: (key: string) => string;

  set: (key: string, value: string) => void;

  remove: (key: string) => void;
}