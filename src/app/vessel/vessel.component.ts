import { Component, OnInit } from '@angular/core';
import { SandboxApi } from '../../code/util/api/sandboxApi';
import { Vessel as VesselEntity } from '../../code/util/api/vessel';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {

  listOfVessels: any = [];

  constructor(private sandboxApi: SandboxApi) {
    let entity = new VesselEntity(this.sandboxApi);

    entity.browse().subscribe(response => {
      this.listOfVessels = response;
    })
  }

  ngOnInit(): void {
  }

}

