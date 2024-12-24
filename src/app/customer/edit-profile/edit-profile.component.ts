import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('ROLE_CUSTOMER'),
    contact: new FormControl(''),
    customerName: new FormControl(''),
  });
  myToken: any = "";
  role: any = "";
  customerDetails: any = {};
  userName: string = localStorage.getItem('userName') || '';
constructor(private customerService: CustomerService, private router: Router) { 
  customerService.fetchCustomerDetails(this.userName).subscribe({
    next: (response) => {
      this.customerDetails = response;
      console.log(this.customerDetails);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
    }
  });
}

  
  



  editCustomer() {
      //hit service
      // this.customerService.editProfile( this.editForm.value).subscribe({
      //   next: (response) => {
      //     console.log(response)
      //     this.router.navigateByUrl('/');
      //     // this.myToken = response.accessToken//local level
      //     // console.log(this.myToken)
      //     // localStorage.setItem('token', this.myToken);
      //     // const payload = JSON.parse(atob(this.myToken.split('.')[1]));
      //     // console.log(payload)
      //     // const userRole = payload['role'];
      //     // console.log(userRole[0].authority);
      //     // if (userRole[0].authority === 'ROLE_ADMIN') {
      //     //   this.router.navigateByUrl('/adminDashboard');
      //     // } else if (userRole[0].authority === 'ROLE_CUSTOMER') {
      //     //   this.router.navigateByUrl('/userDashboard');
      //     // }else if (userRole[0].authority === 'ROLE_EMPLOYEE') {
      //     //   this.router.navigateByUrl('/employeeDashboard');
      //     // }
      //   },
      //   error:(err:HttpErrorResponse)=>{}
      // });

  }

}
