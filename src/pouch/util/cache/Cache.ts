import { ICache, CacheItem } from './ICache';

export class Cache {
  prefix: string = '';

  constructor(private provider: ICache) {
    this.provider = provider;
  }

	getFullKey(key: string): string{
		return this.prefix + key;
	}
	
	get(key: string, version: string){
		var provider = this.provider,
			fullKey = this.getFullKey(key),
			cached = provider.get(fullKey);

		if (cached){
			try {
				var nowTicks = new Date().getTime();
				
				cached = JSON.parse(cached);
				
				if (!cached.expiresTicks && !version){
					return cached.value;
				}
				
				var isValid = true;
				
				if (cached.expiresTicks){
					isValid = (nowTicks <= cached.expiresTicks);
				}
				
				if (isValid && version){
					isValid = !!cached.version && (cached.version >= version);
				}
				
				if (isValid){
					return cached.value;
				}
				
				this.remove(key);
			}
			catch (exc){
				return cached;
			}
		}
			
		return null;
	}

	set(key: string, value: any, expires: number, version: string){
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