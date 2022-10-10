import { Component, OnInit } from '@angular/core';
import { LiveApi } from '../../code/util/api/liveApi';
import { Vessel } from '../../code/util/api/vessel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  someMore: string = '';

  constructor(private liveApi: LiveApi) {}

  ngOnInit(): void {}
}
