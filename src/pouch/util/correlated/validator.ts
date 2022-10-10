import { Correlated } from './correlated';
import { Correlator } from '../correlator';

export class Validator extends Correlated {
  busy:boolean = false;
  reported:any = {};
	
constructor(data:any = {}, executionParams:any = {}) {
  super(data, executionParams);
}

override decodeCorrelations(){
  let me             = this,
    data:any         = me.data || {},
    history:any      = {},
    correlations:any = {};
    
  let appendDependencyIf = function(key:string, dependency:string){
    if (history[key][dependency]){
      return;
    }
    correlations[key].push(dependency);
    history[key][dependency] = true
  };
    
  for (let aKey in data){
    let aData             = data[aKey],
      aRootDependencies = aData.dependencies || [],
      aRulesList        = aData.rules || [];
    
    history[aKey]      = {};
    correlations[aKey] = [];
    
    for (let m=0, n=aRootDependencies.length; m<n; m++){
      appendDependencyIf(aKey, aRootDependencies[m]);
    }
    
    for (let i=0, j=aRulesList.length; i<j; i++){
      let aRule             = aRulesList[i],
        aDependenciesList = aRule.dependencies || [];
      
      for (let a=0, b=aDependenciesList.length; a<b; a++){
        appendDependencyIf(aKey, aDependenciesList[a]);
      }
    }
  }
  
  return new Correlator(correlations).decode();
}

applyByKey(key:string, executionMeta:any){
  let me   = this,
    data = me.getDataByKey(key);
    
  if (!data){
    return;
  }

  return data.perItem ? 
    me.doApplyPerItem(data, key, executionMeta) : 
    me.doApply(data, key, executionMeta);
}	

applyAll(executionMeta:any){
  let me = this;
  
  if (me.busy){
    return;
  }
  
  me.busy = true;

  let result:any = me.executeSequence(me.getSequence(), executionMeta);
  
  me.busy = false;
  
  let totalReport:any = me.getTotalReport(),
    validations:any = {};

  for (let aKey in result){
    let aReport = result[aKey];
    
    if (aReport){
      validations[aKey] = aReport;
    }
  }
  
  return {
    validations : validations,
    report      : totalReport
  };
}

trigger(key:string, extraKeys:any, executionMeta?:any){
  let me = this;
  
  if (me.busy){
    return;
  }
  
  me.busy = true;
  
  let result = me.executeSequence(me.getMergedSequence(key, extraKeys), executionMeta);
  
  me.busy = false;
  
  let totalReport = me.getTotalReport(),
    validations:any = {};

  for (let aKey in result){
    let aReport:any = result[aKey];
    
    if (aReport){
      validations[aKey] = aReport;
    }
  }
  
  return {
    validations : validations,
    report      : totalReport
  };
}

executeSequence(sequence:any, executionMeta:any){
  sequence = sequence || [];
  
  let me     = this,
    result:any = {};

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
    executionParams = me.executionParams,
    totalReport;
  
  if (!data){
    return;
  }
  
  let rules    = data.rules || [],
    errors   = [],
    warnings = [];
    
  for (let m=0, n=rules.length; m<n; m++){
    let aRule = rules[m],
      aFunc = aRule.func,
      aReport;
      
    if (!aFunc){
      continue;
    }
    
    try {
      aReport = aFunc.call(me, me, data, executionParams, executionMeta);
    } catch (exc:any){
      console.log('Validation error on key "' + key + '": ' + (exc && exc.message));
      break;
    }
    
    aReport = me.normalizeReport(aReport, aRule);
    
    if (aReport.valid){
      continue;
    } else {
      if (aReport.level === 'warning'){
        warnings.push(aReport);
      } else {
        errors.push(aReport);
      
        break;
      }
    }
  }
  
  let qualified = me.qualifyValidation(errors.length, warnings.length);

  totalReport = {
    meta        : data,
    valid       : qualified.valid,
    level       : qualified.level,
    permissible : qualified.permissible,
    address     : key,
    errors      : errors,
    warnings    : warnings,
    text        : me.pickValidationText(errors, warnings)
  };
  
  if (qualified.reportable){
    me.reported[key] = totalReport;
  } else {
    delete me.reported[key];
  }

  return totalReport;
}

doApplyPerItem(data:any, key:string, executionMeta:any){
  let me              = this,
    executionParams = me.executionParams,
    totalReport;
  
  if (!data){
    return;
  }
  
  let rules        = data.rules || [],
    indexed:any      = {},
    errorcount   = 0,
    warningcount = 0;

  for (let m=0, n=rules.length; m<n; m++){
    let aRule = rules[m],
      aFunc = aRule.func,
      anItemReportsList;
      
    if (!aFunc){
      continue;
    }
    
    try {
      anItemReportsList = aFunc.call(me, me, data, executionParams, executionMeta);
    } catch (exc:any){
      console.log('Validation error on key "' + key + '": ' + (exc && exc.message));
      break;
    }
      
    for (let i=0, j=anItemReportsList.length; i<j; i++){
      let anItemReport = anItemReportsList[i],
        anItemId:number     = (typeof(anItemReport.id) === 'undefined') ? i : anItemReport.id;
        
      if (!indexed[anItemId]){
        indexed[anItemId] = {
          record : anItemReport.record,
          report : {
            valid    : true,
            address  : key + ':' + anItemId,
            errors   : [],
            warnings : []
          }
        }
      }
      
      let anIndexedReport = indexed[anItemId];
      
      if (!anIndexedReport.report.valid){
        continue;
      }
      
      anItemReport.report = me.normalizeReport(anItemReport.report, aRule);
      
      if (anItemReport.report.valid){
        continue;
      }
      
      if (anItemReport.report.level === 'error'){
        anIndexedReport.report.errors.push(anItemReport.report);
        anIndexedReport.report.valid = false;
        
        errorcount   += 1;
      } else {
        anIndexedReport.report.warnings.push(anItemReport.report);
        
        warningcount += 1;
      }
    }
  }
  
  for (let aKey in indexed){
    let anIndexed  = indexed[aKey],
      aQualified = me.qualifyValidation(anIndexed.report.errors.length, anIndexed.report.warnings.length);
    
    anIndexed.report.valid       = aQualified.valid;
    anIndexed.report.level       = aQualified.level;
    anIndexed.report.permissible = aQualified.permissible;
    anIndexed.report.text        = me.pickValidationText(anIndexed.report.errors, anIndexed.report.warnings);
  }
  
  let qualified = me.qualifyValidation(errorcount, warningcount);
  
  totalReport = {
    meta        : data,
    valid       : qualified.valid,
    level       : qualified.level,
    permissible : qualified.permissible,
    perItem     : indexed,
    text        : data.text
  };

  if (qualified.reportable){
    me.reported[key] = totalReport;
  } else {
    delete me.reported[key];
  }

  return totalReport;
}

qualifyValidation(errorcount:number, warningcount:number){
  let me = this;
  
  return {
    valid       : me.isValidationValid(errorcount, warningcount),
    permissible : me.isValidationPermissible(errorcount, warningcount),
    level       : me.pickValidationLevel(errorcount, warningcount),
    reportable  : me.isValidationReportable(errorcount, warningcount)
  }
}

isValidationValid(errorcount:number, warningcount:number){
  return (errorcount === 0) && (warningcount === 0);
}

isValidationReportable(errorcount:number, warningcount:number){
  return (errorcount > 0) || (warningcount > 0);
}

isValidationPermissible(errorcount:number, warningcount:number){
  return errorcount === 0;
}

pickValidationLevel(errorcount:number, warningcount:number){
  if ((errorcount === 0) && (warningcount === 0)){
    return null;
  } else if (errorcount> 0){
    return 'error';
  } else {
    return 'warning';
  }
}

pickValidationText(errors:any, warnings:any){
  if (errors && errors[0]){
    return errors[0].text;
  }
  
  if (warnings && warnings[0]){
    return warnings[0].text;
  }
  
  return;
}

normalizeReport(report:any, validationMeta:any){
  report         = report || false;
  validationMeta = validationMeta || {};

  var me         = this,
    normalized:any = {};

  normalized.valid = report.hasOwnProperty('valid') ? report.valid : !!report;
  normalized.text  = report.text || validationMeta.text;
  normalized.level = report.level || validationMeta.level;
  
  return normalized;
}

reset(){
  let me = this;
  
  me.reported = {};
}

navigateTo(address: string){
  address = address || '';

  let me          = this,
    reported    = me.reported,
    split       = address.split(':'),
    key         = split[0],
    reportIndex = split[1];

  if (!key){
    return;
  }
  
  let keyReport = reported[key];
  
  if (!keyReport){
    return;
  }
    
  if (typeof(reportIndex) != 'undefined'){
    return keyReport.perItem && keyReport.perItem[reportIndex] && keyReport.perItem[reportIndex].report;
  }
  
  return keyReport;
}

getTotalReport(briefingLevel?:string){
  let me       = this,
    reported = me.reported,
    errors   = 0,
    warnings = 0,
    briefing:any = {};

  for (let aKey in reported){
    let aReport       = reported[aKey],
      aMeta         = aReport.meta,
      aSegments     = aMeta.segments || [],
      aBasicSegment = aSegments[0];

    if (!aBasicSegment){
      continue;
    }
    
    if (aReport.level === 'error'){
      errors += 1;
    } else if (aReport.level === 'warning'){
      warnings += 1;
    }
    
    if (briefingLevel && (aReport.level != briefingLevel)){
      continue;
    }
      
    briefing[aBasicSegment] = briefing[aBasicSegment] || [];
    
    let aBriefing = {
      level : aReport.level,
      text  : aReport.text
    };

    (aSegments.length === 1) ? briefing[aBasicSegment].unshift(aBriefing) : briefing[aBasicSegment].push(aBriefing);
  }

  let qualified = me.qualifyValidation(errors, warnings);
  
  return {
    valid       : qualified.valid,
    level       : qualified.level,
    permissible : qualified.permissible,
    report      : reported,
    briefing    : briefing
  }
}
};