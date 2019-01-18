import { Component, OnInit, Input, Output , EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CDService } from 'src/app/services/cd.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} , DatePipe]
})
export class editModalComponent implements OnInit  {
  @Input() genreList;
  @Output() update  = new EventEmitter<any>();
  @ViewChild('edit') public edit;
  
  public registerForm: FormGroup;
  public submitted = false;
  public loading = false;
  public base64textString;

  constructor(
    private formBuilder : FormBuilder,
    private cdService : CDService,
    private datePipe : DatePipe,
    private snackbar : MatSnackBar,
    private modalService :  NgxSmartModalService
  ) {
   }

  ngOnInit() {
    // start form values and validators
    this.registerForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      release: [''],
      cover: [''],
      idGenre: ['', [Validators.required]],
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls ; }

  save(){
    this.setForm();
    this.loading = true;
    // format the release date
    let dateFormated = this.datePipe.transform(this.registerForm.value.release , 'yyyy-MM-dd');
    this.registerForm.value.release = dateFormated;
    
    //call the service for add method
    this.cdService.editCd(this.registerForm.value).subscribe(
      result =>{
        this.loading = false;
        this.modalService.getModal('edit').close();
        this.registerForm.reset();
        this.snackbar.open('CD successfully edited', ':)', {
          duration: 5000
        });
        // send the notification to parent
        this.update.emit(true);
      },
      error =>{
        this.loading = false;
        this.snackbar.open('Unexpected error', ':(', {
          duration: 5000
        });
      }
    )
    
  }

  setForm(){
    // // format the release date
    let dateFormated = this.datePipe.transform(this.registerForm.value.release ? this.registerForm.value.release : this.edit.getData().release);
    // check if user changed the current field
    this.registerForm.setValue({
      id: this.registerForm.value.id ? this.registerForm.value.id : this.edit.getData().id,
      title: this.registerForm.value.title ? this.registerForm.value.title : this.edit.getData().title,
      description: this.registerForm.value.description ? this.registerForm.value.description : this.edit.getData().description,
      release: dateFormated,
      cover: this.base64textString ? this.base64textString : this.edit.getData().cover,
      idGenre: this.registerForm.value.idGenre ? this.registerForm.value.idGenre : this.edit.getData().idGenre,
    })
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);    
   }

}
