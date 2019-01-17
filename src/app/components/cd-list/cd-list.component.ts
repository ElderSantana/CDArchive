import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CDService } from 'src/app/services/cd.service';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.scss']
})
export class CdListComponent implements OnInit {
  public cdList;
  public genreList;
  public loading = false;
  constructor(
    private modalService : NgxSmartModalService,
    private cdService : CDService
  ) { }

  ngOnInit() {
    this.getGenres();
  }
  add(){
    this.modalService.getModal('add').open();
  }
  addGenre(){
    this.modalService.getModal('addGenre').open();
  }
  getGenres(){
    this.loading = true;
    this.cdService.getGenres().subscribe(
      result=>{
        this.getCds();
        this.genreList = result;
        this.loading = false;
    }, error=>{
      console.log(error);
      this.loading = false;
    })
  }
  getCds(){
    this.loading = true;
    this.cdService.getCds().subscribe(
      result=>{
        this.loading = false;
        this.cdList = result;
    }, error=>{
      this.loading = false;
      console.log(error);
    })
  }
  update(){
    console.log('ATUALIZOU!');
    
    this.getGenres();
  }

}
