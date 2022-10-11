import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Primary as PrimaryApi } from '../../code/util/api/primary';
import { CompanyInterface } from '../../code/util/model/company';
import { Company as CompanyModel } from '../../code/util/model/company';
import { Company as CompanyEntity } from '../../code/util/entity/company';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})

export class CompanyDetailComponent implements OnInit {
  id?: number | undefined;
  fb: any;
  company: CompanyInterface | undefined;

  constructor(private route: ActivatedRoute, private api: PrimaryApi) {

  }
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new CompanyEntity(this.api);

    entity.locate(this.id).subscribe(response => {
      console.log(response)

      this.company = new CompanyModel(response).convert();
    });
  }
}
