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
      text: 'Companies',
      leaf: true,
      value: 'company',
      permission: 'Permissions.Company.View',
    },
    {
      text: 'Vessels',
      leaf: true,
      value: 'vessel',
      permission: 'Permissions.Vessel.View',
    },
    {
      text: 'Products',
      leaf: true,
      value: 'product',
      permission: 'Permissions.Vessel.View',
    },
  ];
  
  selectedItem:MenuItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  selectMenuItem(item:MenuItem){
    this.selectedItem = item;
    
    this.select.emit(item);
  }

}
