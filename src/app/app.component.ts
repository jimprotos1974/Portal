import { Component } from '@angular/core';
import { MenuItem } from './menu/menu.component';

import { FormBuilder } from '@angular/forms';

import { Authorize } from '../code/util/api/authorize';

import { Live } from '../code/util/api/live';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  task: MenuItem | undefined;
  cookie: string | undefined | null;

  fb: any;

  constructor(private formBuilder: FormBuilder, private live: Live) {
    let me = this;

    this.fb = this.formBuilder.group({
      username: [''],
      password: [''],
    });

    this.cookie = localStorage.getItem('user');
  }

  selectMenuItem(menuItem: MenuItem) {
    this.task = menuItem;
  }

  onPortalClick() {}

  login() {
    let userName = this.fb.get('username').value,
      password = this.fb.get('password').value;

    let a = new Authorize(this.live);;

    a.login(userName, password).subscribe((response) => {
      console.log(response);

      localStorage.setItem('user', JSON.stringify(response));

      this.cookie = response;
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
