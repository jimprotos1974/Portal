import { Component, OnInit } from '@angular/core';
import { Primary as PrimaryApi } from '../../code/util/api/primary';
import { Vessel as VesselEntity } from '../../code/util/entity/vessel';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {

  listOfVessels: any = [];

  constructor(private api: PrimaryApi) {
    let entity = new VesselEntity(this.api);

    entity.browse().subscribe(response => {
      this.listOfVessels = response;
    })
  }

  ngOnInit(): void {
  }

}

