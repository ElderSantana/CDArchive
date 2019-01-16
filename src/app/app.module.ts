import { BrowserModule } from '@angular/platform-browser';
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



@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    DashboardComponent,
    SidebarComponent,
    AddModalComponent,
    NavbarComponent,
    CdListComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    AngularFontAwesomeModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
