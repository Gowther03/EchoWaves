import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AdminHomeComponent,
    ViewCustomersComponent,
    ViewEmployeesComponent,
    AddEmployeeComponent,
    AdminHeaderComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule, AppRoutingModule, RouterModule, ReactiveFormsModule
  ]
})
export class AdminModule { }
