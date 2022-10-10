export interface Correlations {
  [name: string]: string[];
}

export class Correlator {
  constructor(public correlations: Correlations) {
    this.correlations = correlations;
  }

  decode() {
    let me = this,
      correlations = this.correlations,
      process = {
        correlations: correlations,
        affected: {
          leveled: {},
          named: {},
          sorted: {},
        },
        affectors: {
          leveled: {},
          named: {},
          sorted: {},
        },
        sequence: {
          leveled: {},
          sorted: [],
        },
      };

    for (let aName in correlations) {
      let dependencies = correlations[aName] || [];

      if (dependencies.length === 0) {
        dependencies = ['_no_dependency'];
      }

      me.diveDownNode(aName, aName, dependencies, process);
    }

    me.buildUp(process);

    return {
      affectors: process.affectors.sorted,
      sequence: process.sequence.sorted,
    };
  }

  diveDownNode(
    root: string,
    name: string,
    dependencies: string[],
    process: any,
    level: number = 0,
    historyNodes: string[] = []
  ) {
    dependencies = dependencies || [];
    level = level || 0;
    historyNodes = historyNodes || [name];

    for (let m = 0, n = dependencies.length; m < n; m++) {
      let aDependency = dependencies[m];

      if (historyNodes.indexOf(aDependency) >= 0) {
        console.log('Circular dependencies detected and disregarded: ' + name);
        continue;
      }

      process.affectors.named[aDependency] =
        process.affectors.named[aDependency] || {};
      process.affectors.named[aDependency][root] = true;

      process.affectors.leveled[aDependency] =
        process.affectors.leveled[aDependency] || {};
      process.affectors.leveled[aDependency][level] =
        process.affectors.leveled[aDependency][level] || {};
      process.affectors.leveled[aDependency][level][root] = true;

      process.affected.named[root] = process.affected.named[root] || {};
      process.affected.named[root][aDependency] = true;

      process.affected.leveled[root] = process.affected.leveled[root] || {};
      process.affected.leveled[root][level] =
        process.affected.leveled[root][level] || {};
      process.affected.leveled[root][level][aDependency] = true;

      if (process.correlations[aDependency]) {
        let loops: any = {};

        loops[aDependency] = process.correlations[aDependency];

        this.diveDownNode(
          root,
          aDependency,
          loops[aDependency],
          process,
          level + 1,
          [...historyNodes, name]
        );
      }
    }

    return process;
  }

  buildUp(process: any): any {
    let me = this;

    for (let anAffector in process.affectors.leveled) {
      let aLevels = process.affectors.leveled[anAffector],
        aLevelsKeys = Object.keys(aLevels),
        aSortedKeys = me.sortLevels(aLevelsKeys);

      if (!process.affectors.sorted[anAffector]) {
        process.affectors.sorted[anAffector] = [];
      }

      for (let m = 0, n = aSortedKeys.length; m < n; m++) {
        let aKey = aSortedKeys[m],
          anAffectedList = aLevels[aKey];

        for (let aName in anAffectedList) {
          process.affectors.sorted[anAffector].push(aName);
        }
      }

      process.affectors.sorted[anAffector] = me.trimKeys(
        process.affectors.sorted[anAffector],
        anAffector
      );
    }

    for (let anAffected in process.affected.leveled) {
      let aLevels = process.affected.leveled[anAffected],
        aLevelsKeys = Object.keys(aLevels),
        aSortedKeys = me.sortLevels(aLevelsKeys);

      if (!process.affected.sorted[anAffected]) {
        process.affected.sorted[anAffected] = [];
      }

      for (let k = 0, l = aSortedKeys.length; k < l; k++) {
        let aKey = aSortedKeys[k],
          anAffectedList = aLevels[aKey];

        for (let aName in anAffectedList) {
          process.affected.sorted[anAffected].push(aName);
        }
      }

      process.affected.sorted[anAffected] = me.trimKeys(
        process.affected.sorted[anAffected],
        anAffected
      );
    }

    for (let anAffected in process.affected.leveled) {
      let aLevelList = process.affected.leveled[anAffected],
        aLevelCount = Object.keys(aLevelList).length;

      if (!process.sequence.leveled[aLevelCount]) {
        process.sequence.leveled[aLevelCount] = {};
      }

      process.sequence.leveled[aLevelCount][anAffected] = true;
    }

    let sortedKeys = me.sortLevels(Object.keys(process.sequence.leveled));

    for (let k = 0, l = sortedKeys.length; k < l; k++) {
      let aKey = sortedKeys[k],
        aLevel = process.sequence.leveled[aKey];

      for (let aName in aLevel) {
        process.sequence.sorted.push(aName);
      }
    }

    process.sequence.sorted = me.trimKeys(process.sequence.sorted);
  }

  sortLevels(keys: string[] = []) {
    return keys.sort((a: string, b: string) => parseInt(a) - parseInt(b));
  }

  trimKeys(list: string[], exclude: any = null) {
    list = list || [];

    let distinct = [],
      history: any = {};

    for (let i = list.length - 1, j = 0; i >= j; i--) {
      let aValue = list[i];

      if (exclude && exclude === aValue) {
        continue;
      }

      if (history[aValue]) {
        continue;
      }

      history[aValue] = true;

      distinct.push(aValue);
    }

    return distinct.reverse();
  }
}
