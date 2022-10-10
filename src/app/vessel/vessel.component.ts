import { Component, OnInit } from '@angular/core';
import { LiveApi } from '../../code/util/api/liveApi';
import { Vessel as VesselEntity } from '../../code/util/api/vessel';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {

  listOfVessels: any = [];

  constructor(private liveApi: LiveApi) {
    let entity = new VesselEntity(this.liveApi);

    entity.browse().subscribe(response => {
      this.listOfVessels = response;
    })
  }

  ngOnInit(): void {
  }

}

