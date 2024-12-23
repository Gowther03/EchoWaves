import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { ViewCustomersByEmployeeComponent } from './view-customers/view-customers.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';



@NgModule({
  declarations: [
    EmployeeLayoutComponent,
    EmployeeHeaderComponent,
    ViewCustomersByEmployeeComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule, AppRoutingModule, RouterModule,
  ]
})
export class EmployeeModule { }
