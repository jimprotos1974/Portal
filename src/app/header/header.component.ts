import { Component, OnInit } from '@angular/core';
import { Primary as PrimaryApi } from '../../code/api/primary';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  someMore: string = '';

  constructor(private api: PrimaryApi) {}

  ngOnInit(): void {}
}
