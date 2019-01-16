import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './layouts/panel/panel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'dashboard',
        component : DashboardComponent,
      },
    ] 
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
