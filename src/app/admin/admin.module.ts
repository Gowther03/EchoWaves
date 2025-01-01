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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { DeliveryAgentPageComponent } from './delivery-agent-page/delivery-agent-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { AddDeliveryAgentComponent } from './add-delivery-agent/add-delivery-agent.component';
import { ViewDeliveryAgentComponent } from './view-delivery-agent/view-delivery-agent.component';
import { DeleteDeliveryAgentComponent } from './delete-delivery-agent/delete-delivery-agent.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
@NgModule({
  declarations: [
    AdminHomeComponent,
    ViewCustomersComponent,
    ViewEmployeesComponent,
    AddEmployeeComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    ProductsPageComponent,
    CustomerPageComponent,
    DeliveryAgentPageComponent,
    OrdersPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    ViewProductsComponent,
    DeleteCustomerComponent,
    AddDeliveryAgentComponent,
    ViewDeliveryAgentComponent,
    DeleteDeliveryAgentComponent,
    ViewOrdersComponent,
  ],
  imports: [
    CommonModule, AppRoutingModule, RouterModule, ReactiveFormsModule,FormsModule

  ],
  exports: [
    ViewCustomersComponent,
  ]
})
export class AdminModule { }
