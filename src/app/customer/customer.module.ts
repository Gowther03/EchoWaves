import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from '../login/login.component';
import { MensComponent } from './mens-section/mens.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { WomensSectionComponent } from './womens-section/womens-section.component';
import { MensJeansComponent } from './mens-jeans/mens-jeans.component';
import { MensShirtComponent } from './mens-shirt/mens-shirt.component';
import { MensTshirtComponent } from './mens-tshirt/mens-tshirt.component';
import { WomensTopComponent } from './womens-top/womens-top.component';
import { CartComponent } from './cart/cart.component';
import { KidsSecitionComponent } from './kids-secition/kids-secition.component';
import { JumpsuitsComponent } from './jumpsuits/jumpsuits.component';
import { TraditionalComponent } from './traditional/traditional.component';
import { SportswearComponent } from './sportswear/sportswear.component';
import { WomensBottomwearComponent } from './womens-bottomwear/womens-bottomwear.component';
import { WomensOuterwearComponent } from './womens-outerwear/womens-outerwear.component';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerHeaderComponent,
    CustomerLayoutComponent, EditProfileComponent, LoginComponent, MensComponent,
     CustomerFooterComponent, WomensSectionComponent, MensJeansComponent, MensShirtComponent,
      MensTshirtComponent,  WomensTopComponent, CartComponent, KidsSecitionComponent, 
      JumpsuitsComponent, TraditionalComponent, SportswearComponent,WomensTopComponent,
      WomensBottomwearComponent,WomensOuterwearComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerDashboardComponent
  ]
})
export class CustomerModule { }
