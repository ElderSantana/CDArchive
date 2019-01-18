import { Component, OnInit, Input, Output , EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CDService } from 'src/app/services/cd.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material';

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

  constructor(
    private formBuilder : FormBuilder,
    private cdService : CDService,
    private datePipe : DatePipe,
    private snackbar : MatSnackBar
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
      cover: this.registerForm.value.cover ? this.registerForm.value.cover : this.edit.getData().cover,
      idGenre: this.registerForm.value.idGenre ? this.registerForm.value.idGenre : this.edit.getData().idGenre,
    })
  }
}
