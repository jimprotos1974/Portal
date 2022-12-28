export type EndpointMethod = {
  method: string;
  permission?: string;
  url: string;
};

export type ControllerEntity = {
  [methodName: string]: EndpointMethod;
};

export type Controllers = {
  [entityName: string]: ControllerEntity;
};

type Tokens = {
  [key: string]: string | number;
};

export abstract class EndpointFactory {
  abstract baseUrl: string;
  abstract controllers: Controllers;

  normalizedControllers: Controllers;

  constructor() {
    this.normalizedControllers = this.normalizeControllers();
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  normalizeControllers(): Controllers {
    let normalized: Controllers = {};

    for (let aName in this.controllers) {
      normalized[aName.toLowerCase()] = this.controllers[aName];
    }

    return normalized;
  }

  getControllerEntity(entity: string): ControllerEntity {
    entity = entity || '';
    entity = entity.toLowerCase();

    return this.controllers[entity];
  }

  getEndpoint(name: string, action: string, tokens: Tokens) {
    let entity = this.getControllerEntity(name),
      pick = entity && entity[action];

    if (!pick) {
      return;
    }

    pick = {
      ...pick,
      url: this.getSolidUrl(this.getBaseUrl() + pick.url, tokens),
    };

    return pick;
  }

  getSolidUrl(url: string = '', tokens: Tokens = {}) {
    for (let aName in tokens) {
      let aToken = tokens[aName] + '';
      
      url = url.replace(new RegExp('{' + aName + '}', 'gi'), aToken);
    }

    return url;
  }
}
