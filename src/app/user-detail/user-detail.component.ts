import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dummy as DummyApi } from '../../code/api/dummy';
import { UserInterface } from '../../code/model/user';
import { User as UserModel } from '../../code/model/user';
import { User as UserEntity } from '../../code/entity/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  id?: number | undefined;
  user: UserInterface | undefined;

  constructor(private route: ActivatedRoute, private api: DummyApi) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let entity = new UserEntity(this.api);

    entity.locate(this.id)
    .then((response) => {
      console.log(response);

      this.user = new UserModel(response).convert();
    });
  }
}
