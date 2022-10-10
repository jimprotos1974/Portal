import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

@Input() task!: MenuItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
