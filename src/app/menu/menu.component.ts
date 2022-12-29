import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as globals from '../../code/Globals'

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

  selectMenuItem(item:MenuItem){
    alert(1);
    this.selectedItem = item;
    
    this.select.emit(item);
  }

}
