import { Authorize as AuthorizeEntity } from '../code/entity/authorize';

import { Cache } from '../pouch/util/cache/Cache';

import * as globals from '../code/globals'

import { Injectable } from '@angular/core';

export type UserData = {
  approvalLevel? : number,
  companyCode? : string,
  department? : string,
  environment? : string,
  expiredAt? : Date,
  expiresAtUtc? : string,
  fullName? : string,
  userName?: string,
  userId? : string,
  roleCode? : string,
  refreshToken? : string,
  permissions? : string[],
  roles? : string[],
  vesselsAssigned? : number[] | string[]
}

@Injectable({
  providedIn: 'root',
})

export class User{
  userData? : UserData | null;

	cacher? : Cache;

  constructor(){
		this.cacher = globals.params.cache!;
  }

  isLoggedIn(): boolean{
    return this.userData ? !!this.userData.userName : false;
  }

	getUserData(){
		return this.userData;
	}
	
	login(username: string, password: string){
    let entity = new AuthorizeEntity(globals.params.primaryApi!);

    return entity
      .login(username, password)
      .then((response) => {
				this.userData = response;
				this.saveUser();
      });
	}
	
	logout(){
    let entity = new AuthorizeEntity(globals.params.primaryApi!);

    return entity
      .logout()
      .then((response) => {
				this.userData = null;
				this.saveUser();
      });
	}

	getUserName(): string | undefined{
		return this.userData?.userName;
	}

	saveUser(){
		let data = this.userData;
			
		if (!data){
			return this.cacher!.remove('user');
		}
		
		this.cacher!.set('user', data);
	}
	
	hasPermission(permission: string): boolean{
		if (!permission){
			return true;
		}
		
		let userData = this.getUserData(),
			permissions = userData?.permissions || [];
			
		return !!permissions.find(e => e === permission);
	}
	
	getUser(){
		return this.userData;
	}
}