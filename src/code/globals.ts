import { Cache } from '../pouch/util/cache/Cache';
import { IApi } from '../code/api/iApi';

type Params = {
  cache : Cache | null,
  primaryApi : IApi | null
};

export let params: Params;
