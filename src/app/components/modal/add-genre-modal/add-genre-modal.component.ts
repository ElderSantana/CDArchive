import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CDService } from 'src/app/services/cd.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-add-genre-modal',
  templateUrl: './add-genre-modal.component.html',
  styleUrls: ['./add-genre-modal.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} , DatePipe]
})
export class AddGenreModalComponent implements OnInit {
  @Output() update  = new EventEmitter<any>();
  public registerForm: FormGroup;
  public submitted = false;
  public loading = false;

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
    
    //call the service for add method
    this.cdService.addGenre(this.registerForm.value).subscribe(
      result =>{
        this.loading = false;
        this.submitted = false;
        this.modalService.getModal('addGenre').close();
        this.snackbar.open('Genre successfully created', ':)', {
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
}
