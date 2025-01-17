import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  isLoading: boolean = false;

  toastMessage = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    const userName = localStorage.getItem('userName'); // Assuming userName is stored in localStorage
    if (userName) {
      this.customerService.changePassword(userName, this.oldPassword, this.newPassword).subscribe({
        next: () => {
          this.showToast('Password changed successfully!');
          setTimeout(() => {
            this.router.navigateByUrl('/CustomerDashboard/:userName/profile'); // Redirect to profile page
          }, 2000);
        },
        error: (err) => {
          this.showToast(`Error: ${err.error.message}`);
          this.isLoading = false;
        }
      });
    } else {
      this.showToast('User not logged in!');
    }
  }

  showToast(message: string) {
      this.toastMessage = message;
      const toastElement = document.getElementById('errorToast');
      if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
      }
    }

    closeToast() {
      const toast = document.getElementById('errorToast');
      if (toast) {
        toast.classList.remove('show'); // Hide the toast
      }
    }
}
