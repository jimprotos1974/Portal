import { Component } from '@angular/core';
import { Cache } from '../pouch/util/cache/Cache';
import { LocalStorage } from '../pouch/util/cache/LocalStorage';

import * as globals from '../code/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    globals.params.cache = new Cache(new LocalStorage(), '');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
