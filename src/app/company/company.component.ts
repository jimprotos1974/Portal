import { Component, OnInit } from '@angular/core';
import { Primary as PrimaryApi } from '../../code/util/api/primary';
import { CompanyInterface } from '../../code/util/model/company';
import { Company as CompanyModel } from '../../code/util/model/company';
import { Company as CompanyEntity } from '../../code/util/entity/company';
import { Model } from '../../pouch/model/model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})

export class CompanyComponent implements OnInit {
  listOfCompanies: CompanyInterface[] = [];

  constructor(private api: PrimaryApi) {
    let entity = new CompanyEntity(this.api);

    entity.browse().subscribe((response) => {
      this.listOfCompanies = Model.convertList(response, CompanyModel);
    });
  }

  ngOnInit(): void {}
}
