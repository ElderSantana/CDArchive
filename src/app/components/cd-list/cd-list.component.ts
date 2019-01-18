import { Component, OnInit , Inject } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CDService } from 'src/app/services/cd.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddGenreModalComponent } from '../modal/add-genre-modal/add-genre-modal.component';
import { DialogComponent } from '../dialog/dialog.component';
import {MatSnackBar} from '@angular/material';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} , DatePipe]

})
export class CdListComponent implements OnInit {
  public cdList;
  public genreList;
  public loading = false;
  public cdSelected
  public listAuxiliare;
  public CD ;
  constructor(
    private modalService : NgxSmartModalService,
    private cdService : CDService,
    public dialog: MatDialog,
    private snackbar : MatSnackBar,
    private datePipe : DatePipe
  ) { }

  ngOnInit() {
    this.getGenres();

    this.CD = {
      title : "",
      description : "",
      Endereco : "",
      release : "",
      cover : "",
      idGenre: "",
    }
  }
  add(){
    this.modalService.getModal('add').open();
  }
  edit(cd){
    // remove old data because of the ngxModal bug with dinamic data
    this.modalService.getModal('edit').removeData();
    this.modalService.setModalData(cd ,'edit');
    this.modalService.getModal('edit').open();
  }
  showCover(cd){
    // remove old data because of the ngxModal bug with dinamic data
    this.modalService.getModal('image').removeData();
    this.modalService.setModalData(cd ,'image');
    this.modalService.getModal('image').open();
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
        this.listAuxiliare = result;
        this.cdList = result;
    }, error=>{
      this.loading = false;
      console.log(error);
    })
  }
  update(){
    this.getGenres();
  }
  openDialog(id): void {
    this.cdSelected = id;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.deleteCd(this.cdSelected) : "";
    });
  }
  deleteCd(id){
    this.loading = true;
    this.cdService.removeCd(id).subscribe(
      result=>{
        this.snackbar.open('CD successfully removed', ':)', {
          duration: 5000
        });
        this.loading = false;
        this.getGenres();
    }, error=>{
      this.loading = false;
      this.snackbar.open('Unexpected error', ':(', {
        duration: 5000
      });
    })
  }
  filterHead(column){
    this.cdList = this.listAuxiliare;
    switch (column) {
      case 'title':  
        if(this.CD.title){
          this.cdList =  this.cdList.filter( 
            item => this.cdService.slug(item.title).toLowerCase().indexOf(this.cdService.slug(this.CD.title)) >= 0 
          );
        }
      break;
      case 'description':
        if(this.CD.description){
          this.cdList =  this.cdList.filter( 
            item => this.cdService.slug(item.description).toLowerCase().indexOf(this.cdService.slug(this.CD.description)) >= 0 
          ); 
        }
      break;
      case 'release':
        if(this.CD.release){
           // format the release date
          let dateFormated = this.datePipe.transform(this.CD.release , 'yyyy-MM-dd');
          this.cdList =  this.cdList.filter( 
            item => item.release == dateFormated 
          ); 
        }
      break;
      case 'idGenre':
        if(this.CD.idGenre){
          this.cdList =  this.cdList.filter( 
            item => 
             item.idGenre == this.CD.idGenre 
          );  
        }
      break;
      default:
      break;
    }
    
  }

  geGenre(id){
    let genre = this.genreList.filter(
      item => item.id == id
    )
  }

}