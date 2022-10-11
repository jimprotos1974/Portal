import { Injectable } from '@angular/core';
import { LiveRequest } from './liveRequest';
import { Api } from './api';
import { DummyApi } from './dummyApi';

@Injectable({
  providedIn: 'root',
})

export class CompositionRoot{
  primaryApi: Api?;
  
  constructor() {
    
  }

  composeApi(): Api  {
    return DummyApi;
  }
}
