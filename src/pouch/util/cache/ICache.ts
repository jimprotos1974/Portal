export type CacheItem = {
  insertedTicks : number;
  expiresTicks : number | null;
  version : string | null;
  value : any
};

export interface ICache{
  get: (key: string) => string | null;

  set: (key: string, value: string) => void;

  remove: (key: string) => void;
}