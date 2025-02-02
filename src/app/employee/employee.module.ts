import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminModule } from '../admin/admin.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeLayoutComponent,
    EmployeeHeaderComponent,
    EmployeeDashboardComponent,
    OrderHistoryComponent,
  ],
  imports: [
    CommonModule, AppRoutingModule, RouterModule, FormsModule
  ]
})
export class EmployeeModule { }
