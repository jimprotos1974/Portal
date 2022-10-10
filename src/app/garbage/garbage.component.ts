import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Calculator } from '../../pouch/util/correlated/calculator';
import { Validator } from '../../pouch/util/correlated/validator';
import { Advisor } from '../../pouch/util/correlated/advisor';

interface Garbage {
  salaryMonths: FormControl;
  monthlySalaryIncome: FormControl;
  yearlySalaryIncome: FormControl;
  depositIncome: FormControl;
  otherIncome: FormControl;
  totalIncome: FormControl;
}

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css'],
})
export class GarbageComponent implements OnInit {
  calculator: Calculator | null = null;
  validator: Validator | null = null;
  advisor: Advisor | null = null;

  v: any = {};
  a: any = {};

  fb: any;

  constructor(private formBuilder: FormBuilder) {
    let me = this;
    
    this.fb = this.formBuilder.group({
      salaryMonths: [0],
      monthlySalaryIncome: [0],
      yearlySalaryIncome: [0],
      depositIncome: [0],
      otherIncome: [0],
      totalIncome: [0],

      householdExpenses: [0],
      personalExpenses: [0],
      fixedExpenses: [0],
      taxesExpenses: [0],
      depositExpenses: [0],
      totalExpenses: [0],
    });

    this.calculator = new Calculator(
      {
        yearlySalaryIncome: {
          func: (calculator: Calculator, rule: any, params: any, meta: any) => {
            let monthly = params.fb.get('monthlySalaryIncome').value || 0,
              months = params.fb.get('salaryMonths').value || 0,
              value = monthly * months;

            params.fb
              .get('yearlySalaryIncome')
              .setValue(value, { emitEvent: false });

            return value;
          },
          dependencies: ['monthlySalaryIncome', 'salaryMonths'],
        },
        totalIncome: {
          func: (calculator: Calculator, rule: any, params: any, meta: any) => {
            let yearly = params.fb.get('yearlySalaryIncome').value || 0,
              other = params.fb.get('otherIncome').value || 0,
              deposit = params.fb.get('depositIncome').value || 0,
              value = yearly + other + deposit;

            params.fb.get('totalIncome').setValue(value, { emitEvent: false });

            return value;
          },
          dependencies: ['yearlySalaryIncome', 'otherIncome', 'depositIncome'],
        },
        totalExpenses: {
          func: (calculator: Calculator, rule: any, params: any, meta: any) => {
            let household = params.fb.get('householdExpenses').value || 0,
              personal = params.fb.get('personalExpenses').value || 0,
              fixed = params.fb.get('fixedExpenses').value || 0,
              taxes = params.fb.get('taxesExpenses').value || 0,
              deposit = params.fb.get('depositExpenses').value || 0,
              value = household + personal + fixed + taxes + deposit;

            params.fb
              .get('totalExpenses')
              .setValue(value, { emitEvent: false });

            return value;
          },
          dependencies: [
            'householdExpenses',
            'personalExpenses',
            'fixedExpenses',
            'taxesExpenses',
            'depositExpenses',
          ],
        },
      },
      this
    );

    this.validator = new Validator(
      {
        salaryMonths: {
          segments: ['salaryMonths'],
          path: 'salaryMonths',
          text: 'Errors found on "Salary Months".',
          rules: [
            {
              text: '"Salary Months" Range.',
              level: 'error',
              func: function (
                validator: Validator,
                rule: any,
                params: any,
                meta: any
              ) {
                let value = params.fb.get('salaryMonths').value || 0;

                if (value >= 0 && value <= 14) {
                  return true;
                }

                return {
                  valid: false,
                  text: 'Salary Months should verify the following condition:\n0 <= value <= 14',
                };
              },
            },
            {
              text: '"Salary Months" Range.',
              level: 'warning',
              func: function (
                validator: Validator,
                rule: any,
                params: any,
                meta: any
              ) {
                let value = params.fb.get('salaryMonths').value || 0;

                if (value <= 2) {
                  return {
                    valid: false,
                    text:
                      'Only [' +
                      value +
                      '] Salary Months declared.\nIs this intentional?',
                  };
                }

                return true;
              },
            },
          ],
        },
        otherIncome: {
          segments: ['otherIncome'],
          path: 'otherIncome',
          text: 'Errors found on "Other Incomes Total".',
          rules: [
            {
              text: '"Other Incomes Total" is greater than "Yearly Salary Income".\nIs this intentional?',
              level: 'warning',
              func: function (
                validator: Validator,
                rule: any,
                params: any,
                meta: any
              ) {
                let yearly = params.fb.get('yearlySalaryIncome').value || 0,
                  value = params.fb.get('otherIncome').value || 0;

                return value <= yearly;
              },
              dependencies: ['yearlySalaryIncome'],
            },
          ],
        },
        totalExpenses: {
          segments: ['totalExpenses'],
          path: 'totalExpenses',
          text: 'Errors found on "Total Expenses".',
          rules: [
            {
              text: '"Total Expenses" is greater than "Total Income".',
              level: 'error',
              func: function (
                validator: Validator,
                rule: any,
                params: any,
                meta: any
              ) {
                var income = params.fb.get('totalIncome').value || 0,
                  value = params.fb.get('totalExpenses').value || 0;

                return value <= income;
              },
              dependencies: ['totalIncome'],
            },
            {
              text: '"Total Expenses" seems to affect the "Deposit".\nIs this intentional?',
              level: 'warning',
              func: function (
                validator: Validator,
                rule: any,
                params: any,
                meta: any
              ) {
                let yearly = params.fb.get('yearlySalaryIncome').value || 0,
                  other = params.fb.get('otherIncome').value || 0,
                  value = params.fb.get('totalExpenses').value || 0;

                return value <= yearly + other;
              },
              dependencies: ['yearlySalaryIncome', 'otherIncome'],
            },
            {
              text: '"Total Expenses" is too close to "Total Income".\nIs this intentional?',
              level: 'warning',
              func: function (
                validator: Validator,
                rule: any,
                params: any,
                meta: any
              ) {
                let income = params.fb.get('totalIncome').value || 0,
                  value = params.fb.get('totalExpenses').value || 0;

                if (value >= income) {
                  return true;
                }

                return value <= income * 0.97;
              },
              dependencies: ['totalIncome'],
            },
          ],
        },
      },
      this
    );

    this.advisor = new Advisor(
      {
        yearlySalaryIncome: {
          text: 'ReadOnly field.\n\nCalculated as:\n("Salary Months" * "Monthly Salary Income")',
        },
        otherIncome: {
          text: 'Set the Monthly Salary Income.',
          func: function (
            validator: Validator,
            rule: any,
            params: any,
            meta: any
          ) {
            var salaryMonths = params.fb.get('salaryMonths').value || 0,
              otherIncome = params.fb.get('otherIncome').value || 0;

            if (!salaryMonths) {
              return null;
            }

            if (salaryMonths != 12 && salaryMonths != 14 && otherIncome === 0) {
              return {
                text: 'Salary Months differ from the usual 12 or 14.\n\nConsider adding an Income to "Other Income" field.',
              };
            }

            return null;
          },
          dependencies: ['salaryMonths'],
        },
        totalIncome: {
          text: 'ReadOnly field.\n\nCalculated as:\n("Yearly Salary Income" + "Other Income" + "Deposit Income")',
        },
        totalExpenses: {
          text: 'ReadOnly field.\n\nCalculated as:\n("Household" + "Personal" + "Fixed" + "Taxes" + "Deposit")',
        },
      },
      this
    );

    this.fb.get('salaryMonths')?.valueChanges.subscribe(function () {
      me.onFieldChange('salaryMonths');
    });

    this.fb.get('monthlySalaryIncome')?.valueChanges.subscribe(function () {
      me.onFieldChange('monthlySalaryIncome');
    });

    this.fb.get('yearlySalaryIncome')?.valueChanges.subscribe(function () {
      me.onFieldChange('yearlySalaryIncome');
    });

    this.fb.get('depositIncome')?.valueChanges.subscribe(function () {
      me.onFieldChange('depositIncome');
    });

    this.fb.get('otherIncome')?.valueChanges.subscribe(function () {
      me.onFieldChange('otherIncome');
    });

    this.fb.get('totalIncome')?.valueChanges.subscribe(function () {
      me.onFieldChange('totalIncome');
    });

    this.fb.get('householdExpenses')?.valueChanges.subscribe(function () {
      me.onFieldChange('householdExpenses');
    });

    this.fb.get('personalExpenses')?.valueChanges.subscribe(function () {
      me.onFieldChange('personalExpenses');
    });

    this.fb.get('fixedExpenses')?.valueChanges.subscribe(function () {
      me.onFieldChange('fixedExpenses');
    });

    this.fb.get('taxesExpenses')?.valueChanges.subscribe(function () {
      me.onFieldChange('taxesExpenses');
    });

    this.fb.get('depositExpenses')?.valueChanges.subscribe(function () {
      me.onFieldChange('depositExpenses');
    });

    this.fb.get('totalExpenses')?.valueChanges.subscribe(function () {
      me.onFieldChange('totalExpenses');
    });
  }

  ngOnInit(): void {
    console.log('initiated!');
  }

  onFieldChange(path: string) {
    let me = this;

    let extraKeys = me.calculator?.getSequenceByKey(path),
      reportCalc = me.calculator?.trigger(path, extraKeys),
      reportVal: any = me.validator?.trigger(path, extraKeys),
      reportAdv: any = me.advisor?.trigger(path, extraKeys);

    for (let aKey in reportVal.validations) {
      let aField: any = me.fb.get(aKey),
        aReport: any = reportVal.validations[aKey],
        aTitle: string | null = aReport.text,
        aColor: string = '#ffffff';

      if (aReport.valid) {
        aColor = '#ffffff';
      } else if (aReport.level === 'warning') {
        aColor = 'orange';
      } else {
        aColor = 'red';
      }

      me.v[aKey] = {
        color: aColor,
        title: aTitle,
        report: aReport,
      };
    }

    for (let aKey in reportAdv) {
      let aField: any = me.fb.get(aKey),
        anAdvice = reportAdv[aKey];

      me.a[aKey] = {
        title: anAdvice.text,
      };
    }
  }
}
