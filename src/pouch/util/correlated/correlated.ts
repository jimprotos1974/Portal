import { Correlator } from '../correlator';

export class Correlated {	
  data: any;
  executionParams: any;

  private correlations: any;

	constructor(data:any = {}, executionParams:any = {}) {
		this.data            = data;
		this.executionParams = executionParams;
		
		this.correlations    = this.decodeCorrelations();
	}
	
	decodeCorrelations(){
		let me              = this,
			data              = me.data || {},
			correlations: any = {};

		for (let aKey in data){
			let aData = data[aKey];
			
			correlations[aKey] = aData.dependencies;
		}

		return new Correlator(correlations).decode();
	}
	
	getDataByKey(key:string){
		let me   = this,
			data = me.data || {};
		
		return data[key];
	}
	
	getSequenceByKey(key:string){
		let me           = this,
			correlations = me.correlations || {};
			
		return correlations.affectors && correlations.affectors[key];
	}
	
	getSequence(){
		let me           = this,
			correlations = me.correlations || {};
			
		return correlations.sequence;
	}
	
	getMergedSequence(key:string, extraKeys:string[]){
		extraKeys = extraKeys || [];
		
		let me       = this,
			sequence = me.getSequenceByKey(key) || [],
			history:any  = {},
			merged:string[]   = [];

		history[key] = true;
		merged.push(key);
		
		for (let i=0, j=extraKeys.length; i<j; i++){
			let anExtraKey       = extraKeys[i],
				aDerivedSequence = me.getSequenceByKey(anExtraKey) || [];
			
			if (!history[anExtraKey]){
				history[anExtraKey]  = true;
				merged.push(anExtraKey);
			}
			
			for (let a=0, b=aDerivedSequence.length; a<b; a++){
				let aDerivedKey = aDerivedSequence[a];
				
				if (!history[aDerivedKey]){
					history[aDerivedKey]  = true;
					merged.push(aDerivedKey);
				}
			}
		}
		
		for (let m=0, n=sequence.length; m<n; m++){
			let aKey = sequence[m];
			
			if (!history[aKey]){
				history[aKey]  = true;
				merged.push(aKey);
			}
		}
		
		return merged;
	}
};