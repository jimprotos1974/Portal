import { ICache, CacheItem } from './ICache';

export class Cache {

  constructor(private provider: ICache, private prefix: string = '') {
    this.provider = provider;
		this.prefix = prefix;
  }

	getFullKey(key: string): string{
		return this.prefix + key;
	}
	
	get(key: string, version: string | null = null){
		var provider = this.provider,
			fullKey = this.getFullKey(key),
			cachedSource = provider.get(fullKey);

		if (cachedSource){
			var nowTicks = new Date().getTime(),
				cacheItem: CacheItem = JSON.parse(cachedSource);
			
			if (!cacheItem.expiresTicks && !version){
				return cacheItem.value;
			}
			
			var isValid = true;
			
			if (cacheItem.expiresTicks){
				isValid = (nowTicks <= cacheItem.expiresTicks);
			}
			
			if (isValid && version){
				isValid = !!cacheItem.version && (cacheItem.version >= version);
			}
			
			if (isValid){
				return cacheItem.value;
			}
			
			this.remove(key);
		}
			
		return null;
	}

	set(key: string, value: any, expires: number | null = null, version: string | null = null){
		var provider = this.provider,
			fullKey = this.getFullKey(key);
			
		var wrappedValue: CacheItem = {
			insertedTicks  : new Date().getTime(),
			expiresTicks : expires,
			version : version,
			value   : value
		};
		
		provider.set(fullKey, JSON.stringify(wrappedValue));
	}
	
	remove(key: string){
		var provider = this.provider,
			fullKey = this.getFullKey(key);
		
		return provider.remove(fullKey);
	}
}