import { ICache, CacheItem } from './ICache';

export class LocalStorage implements ICache {
  get(key: string){
    return localStorage.getItem(key);
  }

  set(key: string, value: any){
    return localStorage.setItem(key, value);
  }

  remove(key:string){
    return localStorage.removeItem(key);
  }
}
