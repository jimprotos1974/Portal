import { Component, OnInit } from '@angular/core';
import { Primary as PrimaryApi } from '../../code/api/primary';
import { VesselInterface } from '../../code/model/vessel';
import { Vessel as VesselEntity } from '../../code/entity/vessel';
import { Vessel as VesselModel } from '../../code/model/vessel';
import { Model } from '../../pouch/model/model';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})

export class VesselComponent implements OnInit {
  list: VesselInterface[] = [];

  constructor(private primaryApi: PrimaryApi) {
    let entity = new VesselEntity(this.primaryApi);

    entity.browse()
    .then((response) => {
      this.list = Model.convertList(response, VesselModel);
    });
  }

  ngOnInit(): void {
  }

}