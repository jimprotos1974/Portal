import { Component, OnInit } from '@angular/core';
import { Live } from '../../code/util/api/live';
import { Company } from '../../code/util/api/companyModel';
import { Company as CompanyEntity } from '../../code/util/api/company';

import { Model } from '../../pouch/model/model';
import { CompanyModel } from '../../code/util/api/companyModel';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  listOfCompanies: Company[] = [];

  constructor(private live: Live) {
    let entity = new CompanyEntity(this.live);

    entity.browse().subscribe((response) => {
      this.listOfCompanies = Model.convertList(response, CompanyModel);
    });
  }

  ngOnInit(): void {}
}
