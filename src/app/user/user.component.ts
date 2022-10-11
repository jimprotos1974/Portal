import { Component, OnInit } from '@angular/core';
import { Dummy as DummyApi } from '../../code/util/api/dummy';
import { UserInterface } from '../../code/util/model/user';
import { User as UserEntity } from '../../code/util/entity/user';
import { User as UserModel } from '../../code/util/model/user';
import { Model } from '../../pouch/model/model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

  export class UserComponent implements OnInit {
    listOfUsers: UserInterface[] = [];

    constructor(private api: DummyApi) {
      let entity = new UserEntity(this.api);

      entity.browse().subscribe((response) => {
      this.listOfUsers = Model.convertList(response.users, UserModel);
    });
  }

  ngOnInit(): void {
  }

}
