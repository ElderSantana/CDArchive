import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PanelComponent } from './layouts/panel/panel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddModalComponent } from './components/modal/add-modal/add-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CdListComponent } from './components/cd-list/cd-list.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { XHRBackend, ConnectionBackend} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { AddGenreModalComponent } from './components/modal/add-genre-modal/add-genre-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { editModalComponent } from './components/modal/edit-modal/edit-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    DashboardComponent,
    SidebarComponent,
    AddModalComponent,
    NavbarComponent,
    CdListComponent,
    BreadcrumbComponent,
    AddGenreModalComponent,
    DialogComponent,
    editModalComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
    
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    HttpClient,
    {
      provide: ConnectionBackend,
      useClass: XHRBackend
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
