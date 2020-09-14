import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  li1: string;
  li2: string;
  li3: string;
  li4: string;
  li5: string;

  li21: string;
  li22: string;
  li23: string;
  li24: string;

  li31: string;
  li32: string;
  li33: string;

  li41: string;
  li42: string;
  li43: string;

  li51: string;

  constructor() { }

  ngOnInit() {
  }


  clearAllMenu(){
    this.li1 = '';
    this.li2 = '';
    this.li3 = '';
    this.li4 = '';
    this.li5 = '';
  }

  clearAllSubMenu(){

    this.li21 = '';
    this.li22 = '';
    this.li23 = '';
    this.li24 = '';

    this.li31 = '';
    this.li32 = '';
    this.li33 = '';

    this.li41 = '';
    this.li42 = '';
    this.li43 = '';

  }


  activeL21(){
    this.clearAllSubMenu();
    this.li21 = 'active';
    this.clearAllMenu();
    this.li2 = 'active';
  }

  activeL22(){
    this.clearAllSubMenu();
    this.li22 = 'active';
    this.clearAllMenu();
    this.li2 = 'active';
  }

  activeL23(){
    this.clearAllSubMenu();
    this.li23 = 'active';
    this.clearAllMenu();
    this.li2 = 'active';
  }

  activeL24(){
    this.clearAllSubMenu();
    this.li24 = 'active';
    this.clearAllMenu();
    this.li2 = 'active';
  }


  activeL31(){
    this.clearAllSubMenu();
    this.li31 = 'active';
    this.clearAllMenu();
    this.li3 = 'active';
  }

  activeL32(){
    this.clearAllSubMenu();
    this.li32 = 'active';
    this.clearAllMenu();
    this.li3 = 'active';
  }

  activeL33(){
    this.clearAllSubMenu();
    this.li33 = 'active';
    this.clearAllMenu();
    this.li3 = 'active';
  }

  activeL41(){
    this.clearAllSubMenu();
    this.li41 = 'active';
    this.clearAllMenu();
    this.li4 = 'active';
  }

  activeL42(){
    this.clearAllSubMenu();
    this.li42 = 'active';
    this.clearAllMenu();
    this.li4 = 'active';
  }

  activeL43(){
    this.clearAllSubMenu();
    this.li43 = 'active';
    this.clearAllMenu();
    this.li4 = 'active';
  }


  activeL51(){
    this.clearAllSubMenu();
    this.li51 = 'active';
    this.clearAllMenu();
    this.li5 = 'active';
  }


}
