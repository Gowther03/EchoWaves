import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { ViewEmployeesComponent } from './admin/view-employees/view-employees.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { EditProfileComponent } from './customer/edit-profile/edit-profile.component';
import { EmployeeLayoutComponent } from './employee/employee-layout/employee-layout.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },{
    path: "register",
    component: RegisterComponent
  },
  {
    path: "CustomerDashboard",
    component: CustomerLayoutComponent,
    children: [
      { path: ":userName", component: CustomerDashboardComponent,
        canActivate: [AuthGuard],
        data: {roles:['ROLE_CUSTOMER']}
       },
      { path: ":userName/EditProfile", component: EditProfileComponent,
        canActivate: [AuthGuard],
      data: {roles:['ROLE_CUSTOMER']}
       },
    ],
    canActivate: [AuthGuard],
    data: {roles:['ROLE_CUSTOMER']}
  },
  {
    path: "AdminDashboard",
    component: AdminLayoutComponent,
    children: [
      { path: "", component: AdminHomeComponent,
        canActivate: [AuthGuard],
    data: {roles:['ROLE_ADMIN']}
      },
      { path: "AddEmployee", component: AddEmployeeComponent ,
        canActivate: [AuthGuard],
    data: {roles:['ROLE_ADMIN']}
      },
      { path: "Employees", component: ViewEmployeesComponent,
        canActivate: [AuthGuard],
    data: {roles:['ROLE_ADMIN']}
       },
      { path: "Customers", component: ViewCustomersComponent,
        canActivate: [AuthGuard],
    data: {roles:['ROLE_ADMIN']}
       },
    ],
    canActivate: [AuthGuard],
    data: {roles:['ROLE_ADMIN']}
  },
  {
    path:"EmployeeDashboard",
    component: EmployeeLayoutComponent,
    children: [
      { path: "", component: EmployeeDashboardComponent,
        canActivate: [AuthGuard],
    data: {roles:['ROLE_EMPLOYEE']}
       },
      { path: "ViewCustomers", component: ViewCustomersComponent,
        canActivate: [AuthGuard],
    data: {roles:['ROLE_EMPLOYEE']}
      },
    ],
    canActivate: [AuthGuard],
    data: {roles:['ROLE_EMPLOYEE']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
