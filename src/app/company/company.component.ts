import { Component, OnInit } from '@angular/core';
import { LiveApi } from '../../code/util/api/liveApi';
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

  constructor(private liveApi: LiveApi) {
    let entity = new CompanyEntity(this.liveApi);

    entity.browse().subscribe((response) => {
      this.listOfCompanies = Model.convertList(response, CompanyModel);
    });
  }

  ngOnInit(): void {}
}
