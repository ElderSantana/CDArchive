import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CDService } from 'src/app/services/cd.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
