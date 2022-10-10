import { Component, OnInit } from '@angular/core';
import { Live } from '../../code/util/api/live';
import { Vessel } from '../../code/util/api/vessel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  someMore: string = '';

  constructor(private live: Live) {}

  ngOnInit(): void {}
}
