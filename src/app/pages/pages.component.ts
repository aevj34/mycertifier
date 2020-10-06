import { Component, OnInit } from '@angular/core';

declare function init_metronic(): any;
declare function init_layout(): any;
declare function init_demo(): any;
declare function init_quickSidebar(): any;
declare function init_index(): any;
declare function init_task(): any;
declare function init_UIGeneral(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_metronic();
    init_layout();
    init_demo();
    init_quickSidebar();
    init_UIGeneral();
    //init_task();
  }

}
