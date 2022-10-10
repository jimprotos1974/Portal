import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Live } from '../../code/util/api/live';
import { Company } from '../../code/util/api/companyModel';
import { Company as CompanyEntity } from '../../code/util/api/company';
import { CompanyModel } from '../../code/util/api/companyModel';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})

export class CompanyDetailComponent implements OnInit {
  id?: number | undefined;
  fb: any;
  company: Company | undefined;

  constructor(private route: ActivatedRoute, private live: Live) {

  }
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new CompanyEntity(this.live);

    entity.locate(this.id).subscribe(response => {
      console.log(response)

      this.company = new CompanyModel(response).convert();
    });
  }
}
