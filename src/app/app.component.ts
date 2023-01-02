import { Component } from '@angular/core';
import { Cache } from '../pouch/util/cache/Cache';
import { LocalStorage } from '../pouch/util/cache/LocalStorage';
import { Primary as PrimaryApi } from '../code/api/primary'
import { Injector } from '@angular/core';

import * as globals from '../code/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  authenticated: boolean = false;

  constructor(private injector: Injector) {
    globals.params.cache = new Cache(new LocalStorage(), '');
    globals.params.primaryApi = this.injector.get<any>(PrimaryApi);

    if (globals.params.cache!.get('user')){
      this.authenticated = true;
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
