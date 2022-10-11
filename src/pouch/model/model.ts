export interface Field {
  name: string;
  type: string;
  allowNull?: boolean;
  defaultValue?: any;
  convert?: (value: any, data: any) => any;
}

export interface Has {
  name: string;
  model: typeof Model;
}

export class Model {
  static convert(data: any[], model: typeof Model) {
    return new model(data).convert();
  }

  static convertList(list: any[] = [], model: typeof Model) {
    let converted: any[] = [];

    for (let i = 0, j = list.length; i < j; i++) {
      let aData = list[i],
        aModel = new model(aData);

      converted.push(this.convert(aData, model));
    }

    return converted;
  }

  data: any = {};
  fields: Field[] = [];
  hasMany: Has[] = [];
  hasOne: Has[] = [];

  constructor(data: any = {}) {
    this.data = data;
  }

  convertFieldValue(field: Field, data: any) {
    let name = field.name,
      value = data && data[name];

    if (field.convert) {
      return field.convert(value, data);
    }

    if (field.allowNull) {
      return value;
    }

    let isUndefined = typeof value === 'undefined',
      isNull = value === null;

    if (isNull || isUndefined) {
      return field.defaultValue || '';
    }

    return value;
  }

  convert() {
    const data = this.data;

    const fields = this.fields;
    const hasMany = this.hasMany;
    const hasOne = this.hasOne;

    let values: any = {};

    for (let i = 0, j = fields.length; i < j; i++) {
      let aField = fields[i],
        aName = aField.name;

      values[aName] = this.convertFieldValue(aField, data);
    }

    let manyValues: any = {},
      oneValues: any = {};

    for (let i = 0, j = hasMany.length; i < j; i++) {
      let aMany = hasMany[i],
        aManyName = aMany.name,
        aManyModel: any = aMany.model,
        aDataList = data[aManyName];

      if (!aDataList) {
        manyValues[aManyName] = [];
        continue;
      }

      manyValues[aManyName] = aDataList.map((detail: any) => {
        return new aManyModel(detail).convert();
      });
    }

    for (let i = 0, j = hasOne.length; i < j; i++) {
      let aOne = hasOne[i],
        aOneName = aOne.name,
        aOneModel: any = aOne.model,
        aData = data[aOneName];

      if (!aData) {
        oneValues[aOneName] = {};
        continue;
      }

      oneValues[aOneName] = new aOneModel(aData).convert();
    }

    return { ...values, ...manyValues, ...oneValues };
  }

  serialize() {
    return { ...this.data };
  }
}
