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
  userData: UserData = {};

	cacher? : Cache;

  constructor(){
		this.cacher = globals.params.cache!;
  }

  isLoggedIn(): boolean{
    return this.userData ? !!this.userData.userName : false;
  }
	
	login(username: string, password: string){
    let entity = new AuthorizeEntity(globals.params.primaryApi!);

    entity
      .login(username, password)
      .then((response) => {
				this.userData = response;
				this.saveUser();
      });
	}

	saveUser(){
		let data = this.userData;
			
		if (!data){
			return this.cacher!.remove('user');
		}
		
		this.cacher!.set('user', data);
	}
	
	getUser(){
		return this.userData;
	}
}

/*
Ext.define('Vessels.code.User', {
	requires : [],
			
	mixins   : [
		'Ext.mixin.Observable'
	],
	
	config   : {
		data : null
	},
	
    constructor: function(config) {
		let me = this;
		
		me.sessionSettings = {};
		
		me.cacher              = Vessels.app.cache;
		me.authorizeEntity     = Ext.create(Vessels.code.entity.Authorize);
		me.passwordEntity      = Ext.create(Vessels.code.entity.account.UserPassword);
		me.settingsEntity      = Ext.create(Vessels.code.entity.account.UserSetting);
		me.notificationsEntity = Ext.create(Vessels.code.entity.EntityEventLog);
			
        me.mixins.observable.constructor.call(me, config);
    },
	
	isLoggedIn : function(){
		let me   = this,
			data = me.getData();
		
		return !!data;
	},
	
	login : function(username, password, meta){
		let me = this;

		return me.authorizeEntity.login(username, password, meta)
			.then(function(data){
				
				if (!data.requires2fa){
					data.environment = Vessels.app.paramsFactory.getEnvironment() || 'development';
					
					if (data.environment === 'offline'){
						data.bearer      = 'Bearer ' + Pouch.tool.String.Base64.encode(username + ':' + password);
					}
					
					//data.isAboard = true;
					
					me.setData(data);
					me.saveUser();
				}
				
				return data;
			});
	},
	
	logout : async function(){
		let me = this;

		return me.authorizeEntity.logout()
			.then(function(data){
				me.setData(null);
				me.saveUser();
				
				return data;
			});
	},
	
	getUserName : function(){
		let me   = this,
			user = me.getUser();
		
		return user.userName;
	},
	
	twoFactorAuthenticate : async function(username, password, authenticatorToken, meta){
		let me = this;

		return me.authorizeEntity.twoFactorAuthenticate(username, password, authenticatorToken, meta)
			.then(function(data){
				data.environment = Vessels.app.paramsFactory.getEnvironment() || 'development';
				
				if (data.environment === 'offline'){
					data.bearer      = 'Bearer ' + Pouch.tool.String.Base64.encode(username + ':' + password);
				}
				
				me.setData(data);
				me.saveUser();
			});
	},
	
	getBearer : function(){
		let me   = this,
			data = me.getData();
			
		return data && data.bearer;
	},
	
	forgotPassword : async function(email, meta){
		let me = this;

		return me.passwordEntity.forgotPassword(email, meta);
	},
	
	changePassword : async function(oldPassword, newPassword, confirmPassword, meta){
		let me = this;

		return me.passwordEntity.changePassword(oldPassword, newPassword, confirmPassword, meta);
	},
	
	resetPassword : async function(token, email, newPassword, meta){
		let me = this;

		return me.passwordEntity.resetPassword(token, email, newPassword, meta);
	},
	
	setUser : function(data){
		let me = this;
			
		me.setData(data);
	},
	
	getUser : function(){
		let me = this;
			
		return me.getData();
	},
	
	loadUser : function(){
		let me   = this,
			data = me.cacher.get('profile');
			
		me.setData(data);
		
		return data;
	},
	
	saveUser : function(){
		let me   = this,
			data = me.getData();
			
		if (!data){
			return me.cacher.remove('profile');
		}
		
		me.cacher.set('profile', data);
		
		return data;
	},
	
	getSessionSettings : function(){
		let me = this;
			
		return me.sessionSettings;
	},
	
	setSessionSettings : function(data){
		let me = this;
		
		me.sessionSettings = data;
	},
	
	getColumnsets : function(key){
		let me   = this,
			data = me.getSessionSettings() || {};
		
		return data['jobs.columnsets.' + key];
	},
	
	saveColumnsets : function(key, data){
		let me = this;
		
		return me.saveKey('jobs.columnsets.' + key, data);
	},
	
	getActiveColumnset : function(key){
		let me   = this,
			data = me.getSessionSettings() || {};
		
		return data['jobs.columnsets.active.' + key];
	},
	
	saveActiveColumnset : function(key, id){
		let me = this;
		
		return me.saveKey('jobs.columnsets.active.' + key, id);
	},
	
	getDashboard : function(key){
		let me   = this,
			data = me.getSessionSettings() || {};
		
		return data['dashboards.' + key];
	},
	
	saveDashboard : function(key, data){
		let me = this;
		
		return me.saveKey('dashboards.' + key, data);
	},
	
	loadSettings : async function(){
		let me   = this,
			data = await me.settingsEntity.getSettings();
			
		me.setSessionSettings(data);

		return data;
	},
	
	saveSettings : async function(data){
		let me = this;

		me.setSessionSettings(data);
		
		await me.settingsEntity.saveSettings(data)
	},
	
	saveKey : async function(key, value){
		let me   = this,
			data = me.getSessionSettings() || {};
					
		data[key] = value;
				
		return me.saveSettings(data);
	},
	
	getNotifications : async function(){
		let me      = this,
			filters = [{
				name    : 'DateReviewed',
				pattern : 'Equal',
				value   : 'null'
			}],
			data    = await me.notificationsEntity.filter(null, null, filters);
			
		return data;
	},
	
	updateNotification : async function(id, data){
		let me = this;
		
		return me.notificationsEntity.update(id, data);
	},
	
	hasAtLeastOneRoleCode : function(values){
		values = values || [];
		
		let me = this;
		
		for (let i=0, j=values.length; i<j; i++){
			if (me.hasRoleCode(values[i])){
				return true;
			}
		}
			
		return false;
	},
	
	hasRoleCode : function(value){
		let me       = this,
			data     = me.getData(),
			roleCode = data.roleCode;
			
		return Pouch.tool.String.sameText(value, roleCode);
	},
	
	hasRole : function(role){
		let me    = this,
			data  = me.getData(),
			roles = data.roles || [];
			
		return Pouch.tool.String.isIn(role, roles);
	},
	
	hasPermission : function(permission){
		let me = this;
		
		if (!permission){
			return true;
		}
		
		let data        = me.getData(),
			permissions = data.permissions || [];
			
		return Pouch.tool.String.isIn(permission, permissions);
	},
	
	hasClaim : function(claim){
		let me = this;
		
		if (!claim){
			return true;
		}
		
		let data        = me.getData(),
			permissions = data.permissions || [];
			
		return Pouch.tool.String.isIn(claim, permissions);
	},
	
	hasAssignedVessel : function(vesselId){
		let me   = this,
			user = me.getUser();
			
		if (!user){
			return false;
		}
		
		return Ext.Array.contains(user.vesselsAssigned, vesselId);
	},
	
	hasCreatedRecord : function(author){
		let me   = this,
			user = me.getUser();
		
		return author === user.userName;
	},
	
	requestPermissionToUnlock : async function(author){
		let me = this;

		if (me.hasCreatedRecord(author)){
			return true;
		}

		let usersEntity     = Ext.create(Vessels.code.entity.account.User),
			originalUser    = await usersEntity.locateByName(author),
			user            = me.getUser(),
			userDpt         = user.department || '',
			originalUserDpt = originalUser.department || '';
		
		if (userDpt.toLowerCase() != originalUserDpt.toLowerCase()){
			return false;
		}
		
		let originalApprovalLevel = originalUser.approvalLevel || 0,
			approvalLevel         = user.approvalLevel || 0;
			
		if (approvalLevel < originalApprovalLevel){
			return false;
		}
		
		return true;
	}
});
*/