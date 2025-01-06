import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
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
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';
import { MensComponent } from './customer/mens-section/mens.component';
import { WomensSectionComponent } from './customer/womens-section/womens-section.component';
import { MensJeansComponent } from './customer/mens-jeans/mens-jeans.component';
import { MensShirtComponent } from './customer/mens-shirt/mens-shirt.component';
import { MensTshirtComponent } from './customer/mens-tshirt/mens-tshirt.component';
import { WomensTopComponent } from './customer/womens-top/womens-top.component';
import { WomensOuterwearComponent } from './customer/womens-outerwear/womens-outerwear.component';
import { WomensBottomwearComponent } from './customer/womens-bottomwear/womens-bottomwear.component';
import { KidsSecitionComponent } from './customer/kids-secition/kids-secition.component';
import { ProductsPageComponent } from './admin/products-page/products-page.component';
import { CustomerPageComponent } from './admin/customer-page/customer-page.component';
import { DeliveryAgentPageComponent } from './admin/delivery-agent-page/delivery-agent-page.component';
import { OrdersPageComponent } from './admin/orders-page/orders-page.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { DeleteProductComponent } from './admin/delete-product/delete-product.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { AddDeliveryAgentComponent } from './admin/add-delivery-agent/add-delivery-agent.component';
import { ViewDeliveryAgentComponent } from './admin/view-delivery-agent/view-delivery-agent.component';
import { ViewOrdersComponent } from './admin/view-orders/view-orders.component';
import { JumpsuitsComponent } from './customer/jumpsuits/jumpsuits.component';
import { TraditionalComponent } from './customer/traditional/traditional.component';
import { SportswearComponent } from './customer/sportswear/sportswear.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrderConfirmationComponent } from './customer/order-confirmation/order-confirmation.component';
import { MyProfileComponent } from './customer/my-profile/my-profile.component';
import { MyOrdersComponent } from './customer/my-orders/my-orders.component';
import { OrderHistoryComponent } from './employee/order-history/order-history.component';
const routes: Routes = [
  {
    path: "",
    component: CustomerDashboardComponent
  }, {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "CustomerDashboard",
    component: CustomerLayoutComponent,
    children: [
      {
        path: ":userName", component: CustomerDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/EditProfile", component: EditProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/mensSection", component: MensComponent,

      },
      {
        path: ":userName/mensSection/jeansSection", component: MensJeansComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/mensSection/shirtSection", component: MensShirtComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/mensSection/tshirtSection", component: MensTshirtComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/womensSection", component: WomensSectionComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/womensSection/top", component: WomensTopComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/womensSection/OuterWear", component: WomensOuterwearComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/womensSection/bottomwear", component: WomensBottomwearComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },

      {
        path: ":userName/kidsSection", component: KidsSecitionComponent,
      },
      {
        path: ":userName/kidsSection/jumpsuit", component: JumpsuitsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      {
        path: ":userName/kidsSection/traditional", component: TraditionalComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      {
        path: ":userName/kidsSection/sportswear", component: SportswearComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      
      {
        path: ":userName/profile", component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      {
        path: ":userName/bag", component: CartComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      { path: ':userName/order-confirmation', component: OrderConfirmationComponent, 
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      
      {
        path: ":userName/profile", component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      {
        path: ":userName/profile/myProfile", component: MyProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER']}
      },
      {
        path: ":userName/profile/EditProfile", component: EditProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      },
      {
        path: ":userName/profile/myOrders", component: MyOrdersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CUSTOMER'] }
      }
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] }
  },
  //Admin Dashboard
  {
    path: "AdminDashboard",
    component: AdminLayoutComponent,
    children: [
      {
        path: "", component: AdminHomeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: "productPages", component: ProductsPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: "productPages/addproducts", component: AddProductComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN'] }
      },
      {
        path: "productPages/updateproduct",component: UpdateProductComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN']}
      },
      {
        path: "productPages/deleteproduct",component: DeleteProductComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN']}
      },
      {
        path: "productPages/viewProduct",component: ViewProductsComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN']}
      },
      {
        path: "customerspage", component: CustomerPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: "customerspage/viewCustomers", component: ViewCustomersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
     
      {
        path: "deliveryagentpage", component: DeliveryAgentPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path:"deliveryagentpage/addDeliveryAgent", component: AddDeliveryAgentComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path:"deliveryagentpage/viewDeliveryAgent", component: ViewDeliveryAgentComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: "orderspage", component: OrdersPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path:"orderspage/viewOrders", component: ViewOrdersComponent,
        canActivate: [AuthGuard], 
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: "AddEmployee", component: AddEmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: "Employees", component: ViewEmployeesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: "EmployeeDashboard",
    component: EmployeeLayoutComponent,
    children: [
      {
        path: "", component: EmployeeDashboardComponent,

        canActivate: [AuthGuard],
        data: { roles: ['ROLE_DELIVERYAGENT'] }
      },
      {
        path: "ViewOrdersHistory", component: OrderHistoryComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_DELIVERYAGENT'] }
      },
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_DELIVERYAGENT'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
