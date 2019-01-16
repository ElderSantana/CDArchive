import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.scss']
})
export class CdListComponent implements OnInit {

  constructor(
    private modalService : NgxSmartModalService
  ) { }

  ngOnInit() {
  }
  add(){
    console.log('hello');
    
    this.modalService.getModal('add').open();
  }

}
