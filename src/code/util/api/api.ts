import { IRequest } from './iRequest';

export abstract class Api{
  abstract url: string;
  abstract entities: any;

  caller: IRequest;
  normalizedEntities: any;

  constructor(caller: IRequest) {
    this.caller = caller;
    this.normalizedEntities = this.normalizeEntities();
  }

  getCaller(): IRequest {
    return this.caller;
  }

  getBaseUrl(): string {
    return this.url;
  }

  abstract ping(): Promise<boolean>

  normalizeEntities(): any {
    let normalized: any = {};

    for (let aName in this.entities) {
      normalized[aName.toLowerCase()] = this.entities[aName];
    }

    return normalized;
  }

  getEndpointsSet(entity: string): any {
    entity = entity || '';
    entity = entity.toLowerCase();

    return this.entities[entity];
  }

  getEndpoint(entity: string, action: string, tokens: any = {}) {
    let endpoints = this.getEndpointsSet(entity),
      pick = endpoints && endpoints[action];

    if (!pick) {
      return;
    }

    pick = {
      ...pick,
      url: this.getSolidUrl(this.getBaseUrl() + pick.url, tokens),
    };

    return pick;
  }

  getSolidUrl(url: string = '', tokens: any = {}) {
    for (let aName in tokens) {
      url = url.replace(new RegExp('{' + aName + '}', 'gi'), tokens[aName]);
    }

    return url;
  }
}
