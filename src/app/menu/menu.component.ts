import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface MenuItem {
  text: string;
  leaf: boolean;
  value: string;
  permission: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  @Output() select = new EventEmitter<MenuItem>();

  menuItems:MenuItem[] = [
    {
      text: 'Users',
      leaf: true,
      value: 'user',
      permission: 'Permissions.User.View',
    },
    {
      text: 'Products',
      leaf: true,
      value: 'product',
      permission: 'Permissions.Product.View',
    },
  ];
  
  selectedItem:MenuItem | undefined;

  constructor() { }

  ngOnInit(): void {

  }

}
