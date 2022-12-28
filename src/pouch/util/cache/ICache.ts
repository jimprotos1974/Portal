export type CacheItem = {
  insertedTicks : number;
  expiresTicks : number;
  version : string;
  value : any
};

export interface ICache{
  get: (key: string) => CacheItem;

  set: (key: string, value: CacheItem) => void;

  remove: (key: string) => void;
}