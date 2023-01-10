import { Component, OnInit } from '@angular/core';

import { User } from '../../code/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  credentials: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  constructor(private user: User) {
    this.user = user;
  }

  ngOnInit(): void {
    this.credentials = {
      username: '',
      password: '',
    };
  }

  login(): void {
    this.user.login(this.credentials.username, this.credentials.password)
    .then(function(){
      window.location.reload();
    });
  }
}
