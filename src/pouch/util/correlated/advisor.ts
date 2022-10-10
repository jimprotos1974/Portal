import { Correlated } from './correlated';
import { Correlator } from '../correlator';

export class Advisor extends Correlated {
  busy : boolean;
  loaded : boolean;
  noticeBoard : any;
	
  constructor(data:any = {}, executionParams:any = {}) {
    super(data, executionParams);
    
		this.busy         = false;
		this.loaded       = false;
		this.noticeBoard  = {};
  }

  applyByKey(key:string, executionMeta:any){
    let me   = this,
      data = me.getDataByKey(key);
    
      if (!data){
        return;
      }

    return me.doApply(data, key, executionMeta);
  }

applyAll(executionMeta:any){
  let me = this;
  
  if (me.busy){
    return;
  }
  
  me.busy = true;

  let result = me.executeSequence(me.getSequence(), executionMeta);
  
  me.busy   = false;
  me.loaded = true;
  
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

executeSequence(sequence:any, executionMeta:any){
  sequence = sequence || [];
  
  let me     = this,
    result: any = {};

  for (let i=0, j=sequence.length; i<j; i++){
    let aKey    = sequence[i],
      aResult = me.applyByKey(aKey, executionMeta);
    
    if ((typeof(aResult) != 'undefined') && (aResult != null)){
      result[aKey] = aResult;
    }
  }
  
  return result;
}

doApply(data:any, key:string, executionMeta:any){
  let me              = this,
    executionParams = me.executionParams;
  
  if (!data){
    return;
  }
  
  let func = data.func,
    advice: any;

  if (me.loaded && !func){
    return;
  }
    
  try {
    if (func){
      advice = func.call(me, me, data, executionParams, executionMeta);
    } else {
      advice = data.text;
    }
  } catch (exc:any){
    console.log('Advice error on key "' + key + '": ' + (exc && exc.message));
  }

  advice = me.normalizeAdvice(advice, data);
  
  if (advice && advice.active){
    advice.address      = key;
    me.noticeBoard[key] = advice;
  } else {
    delete me.noticeBoard[key];
  }

  return advice;
}

normalizeAdvice(advice:any, adviceMeta:any){
  if (!adviceMeta){
    return;
  }

  var me         = this,
    normalized:any = {};

  normalized.active  = !!(advice && (advice.active != false));
  normalized.title   = (advice && advice.title) || adviceMeta.title;
  normalized.text    = (advice && advice.text) || adviceMeta.text;
  
  return normalized;
}

navigateTo(address:string){
  address = address || '';

  if (!address){
    return;
  }

  let me          = this,
    noticeBoard = me.getNoticeBoard();
  
  return noticeBoard[address];
}

getNoticeBoard(){
  let me = this;
  
  return me.noticeBoard;
}
};