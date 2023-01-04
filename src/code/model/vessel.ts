import { Model } from '../../pouch/model/model';

export interface VesselInterface {
  id: number;
  name: string;
  imo: string;
  vesselType : string
}

export class Vessel extends Model {
  override fields = [{                  
		name           : 'name',
		type           : 'string'
	},{                
		name           : 'imo',
		type           : 'string'
	},{                
		name           : 'vesselType',
		type           : 'string'
	},{                
		name           : 'callSign',
		type           : 'string'
	},{                
		name           : 'flag',
		type           : 'string'
	},{                
		name           : 'mmsi',
		type           : 'int',
		allowNull      : true,
		defaultValue   : null
	},{                
		name           : 'hullNumber',
		type           : 'string'
	},{                
		name           : 'classificationSociety',
		type           : 'string'
	},{                
		name           : 'grt',
		type           : 'number'
	},{                
		name           : 'dwt',
		type           : 'number'
	},{                
		name           : 'loa',
		type           : 'number'
	},{                
		name           : 'propellerPitch',
		type           : 'number'
	},{                
		name           : 'yearBuilt',
		type           : 'int',
		allowNull      : true,
		defaultValue   : null
	},{                
		name           : 'tenantId',
		type           : 'string'
	},{                
		name           : 'dateDelivered',
		type           : 'date'
	},{                
		name           : 'dateLaunched',
		type           : 'date'
	},{                
		name           : 'dateSold',
		type           : 'date'
	},{                
		name           : 'managedSince',
		type           : 'date'
	},{                
		name           : 'managedByOther',
		type           : 'boolean'
	}];
}
