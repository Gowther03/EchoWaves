import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerHeaderComponent,
    CustomerLayoutComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule, ReactiveFormsModule
  ],
  exports: [
    CustomerDashboardComponent
  ]
})
export class CustomerModule { }
