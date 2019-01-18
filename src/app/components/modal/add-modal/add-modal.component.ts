import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CDService } from 'src/app/services/cd.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} , DatePipe]
})
export class AddModalComponent implements OnInit {
  @Input() genreList;
  @Output() update  = new EventEmitter<any>();
  public registerForm: FormGroup;
  public submitted = false;
  public loading = false;
  public base64textString;
  constructor(
    private formBuilder : FormBuilder,
    private cdService : CDService,
    private datePipe : DatePipe,
    private snackbar : MatSnackBar,
    private modalService : NgxSmartModalService
  ) { }

  ngOnInit() {
    // start form values and validators
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      release: ['', Validators.required],
      cover: [''],
      idGenre: ['', [Validators.required]],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls ; }

  save(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    // format the release date
    let dateFormated = this.datePipe.transform(this.registerForm.value.release , 'yyyy-MM-dd');
    this.registerForm.value.release = dateFormated;
    
    // save the base64 image
    this.registerForm.value.cover =  this.base64textString;

    //call the service for add method
    this.cdService.addCd(this.registerForm.value).subscribe(
      result =>{
        this.loading = false;
        this.submitted = false;
        this.modalService.getModal('add').close();
        this.registerForm.reset();
        this.snackbar.open('CD successfully created', ':)', {
          duration: 5000
        });
        // send the notification to parent
        this.update.emit(true);
        
      },
      error =>{
        this.loading = false;
        this.submitted = false;
        this.snackbar.open('Unexpected error', ':(', {
          duration: 5000
        });
      }
    )
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
