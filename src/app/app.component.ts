import { Component } from '@angular/core';
import { MenuItem } from './menu/menu.component';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  task: MenuItem | undefined;
  cookie: string | undefined | null;

  fb: any;

  constructor(private formBuilder: FormBuilder) {
    let me = this;

    this.fb = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  selectMenuItem(menuItem: MenuItem) {
    this.task = menuItem;
  }

  onPortalClick() {}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
