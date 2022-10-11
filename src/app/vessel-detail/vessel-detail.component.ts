import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Primary as PrimaryApi } from '../../code/util/api/primary';
import { VesselInterface } from '../../code/util/model/vessel';
import { Vessel as VesselEntity } from '../../code/util/entity/vessel';
import { Vessel as VesselModel } from '../../code/util/model/vessel';

@Component({
  selector: 'app-vessel-detail',
  templateUrl: './vessel-detail.component.html',
  styleUrls: ['./vessel-detail.component.css']
})

export class VesselDetailComponent implements OnInit {
  id?: number | undefined;
  fb: any;
  vessel: VesselInterface | undefined;

  constructor(private route: ActivatedRoute, private api: PrimaryApi) {

  }
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new VesselEntity(this.api);

    entity.locate(this.id).subscribe(response => {
      console.log(response)

      this.vessel = new VesselModel(response).convert();
    });
  }
}
