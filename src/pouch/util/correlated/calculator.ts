import { Correlated } from './correlated';

export class Calculator extends Correlated {
	busy:boolean = false;
	
	constructor(data:any = {}, executionParams:any = {}) {
		super(data, executionParams);
	}
	
	applyByKey(key:string, executionMeta:any){
		let me   = this,
			data = me.getDataByKey(key);

		return me.doApply(data, key, executionMeta);
	}
	
	applyAll(executionMeta:any){
		let me = this;
		
		if (me.busy){
			return;
		}
		
		me.busy = true;

		let result = me.executeSequence(me.getSequence(), executionMeta);
		
		me.busy = false;
		
		return result;
	}
	
	trigger(key:string, extraKeys:any, executionMeta?:any){
		let me = this;
		
		if (me.busy){
			return;
		}
		
		me.busy = true;
		
		let result = me.executeSequence(me.getMergedSequence(key, extraKeys), executionMeta);

		me.busy = false;
		
		return result;
	}
	
	executeSequence(sequence:string[], executionMeta:any){
		sequence = sequence || [];
		
		let me       = this,
			result:any = {};

		for (let i=0, j=sequence.length; i<j; i++){
			let aKey    = sequence[i],
				aResult = me.applyByKey(aKey, executionMeta);
			
			if ((typeof(aResult) != 'undefined') && (aResult != null)){
				result[aKey] = aResult;
			}
		}
	}
	
	doApply(data:any, key:string, executionMeta:any){
		let me              = this,
			executionParams = me.executionParams,
			result;
		
		if (!data){
			return;
		}
				
		if (!data.func){
			return;
		}
		
		try {
			result = data.func.call(me, me, data, executionParams, executionMeta);
		} catch (exc:any){
			console.log('Calculation error on key "' + key + '": ' + (exc && exc.message));
		}
		
		return result;
	}
};