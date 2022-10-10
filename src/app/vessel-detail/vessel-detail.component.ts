import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandboxApi } from '../../code/util/api/sandboxApi';
import { Vessel } from '../../code/util/api/vesselModel';
import { Vessel as VesselEntity } from '../../code/util/api/vessel';
import { VesselModel } from '../../code/util/api/vesselModel';

@Component({
  selector: 'app-vessel-detail',
  templateUrl: './vessel-detail.component.html',
  styleUrls: ['./vessel-detail.component.css']
})

export class VesselDetailComponent implements OnInit {
  id?: number | undefined;
  fb: any;
  vessel: Vessel | undefined;

  constructor(private route: ActivatedRoute, private sandboxApi: SandboxApi) {

  }
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new VesselEntity(this.sandboxApi);

    entity.locate(this.id).subscribe(response => {
      console.log(response)

      this.vessel = new VesselModel(response).convert();
    });
  }
}
