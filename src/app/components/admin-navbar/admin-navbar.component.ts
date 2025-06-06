import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/customer.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
 changePasswordForm!: FormGroup;

  isSalesOpen = false;
  isPurchasesOpen = false;

  
  isEditMode = false;

  companyName: string = '';
  companyEmail: string = '';
  phoneNumber: number | null = null;
  state: string = '';
  country: string = '';
  customerId: string = '';



  constructor(private router: Router, private fb: FormBuilder,
    private http: HttpClient, private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.passwordMatchValidator, this.passwordNotSameValidator],
      }
    );

    this.loadCustomerProfile();
  }

  openModal() {
    const modalElement = document.getElementById('profileModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  


  loadCustomerProfile(): void {
    const customerId = sessionStorage.getItem('customerId');  // Get from local storage
  
    if (customerId) {
      this.customerId = customerId; 
  
      this.customerService.getCustomerProfile(this.customerId).subscribe(
        (res) => {
          this.companyName = res.companyName;
          this.companyEmail = res.customerId;
          this.phoneNumber = res.phoneNumber;
          this.state = res.state;
          this.country = res.country;
        },
        (err) => {
          console.error('Error loading profile:', err);
        }
      );
    } else {
      console.warn('No customerId found in local storage');
    }
  }
  

  openProfileModal() {
    this.resetToViewMode(); // Always reset before opening modal

    const modalEl = document.getElementById('profileModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  resetToViewMode() {
    this.isEditMode = false;
  }

  toggleEdit() {
    this.isEditMode = true;
  }

  getCompanySuffixName(name: string): string {
    if (!name) return 'Admin';
    const firstWord = name.trim().split(' ')[0];
    return `${firstWord} Admin`;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Block non-numeric keys
    }
  }


  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  passwordNotSameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const currentPassword = control.get('currentPassword')?.value;
    const newPassword = control.get('newPassword')?.value;
    return currentPassword !== newPassword ? null : { sameAsCurrent: true };
  }


  onChangePassword(): void {
    if (this.changePasswordForm.valid) {
      const payload = {
        username: this.changePasswordForm.value.email,
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword,
        confirmPassword: this.changePasswordForm.value.confirmPassword,
      };

      this.customerService.changePassword(payload).subscribe(
        (response) => {
          alert(response); // Will show "Password updated successfully."

          // ✅ Close the Bootstrap modal using Bootstrap's JS API
          const modalElement = document.getElementById('changePasswordModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }

          // ✅ Optional: Reset the form
          this.changePasswordForm.reset();
        },
        (error) => {
          console.error('Error:', error);
          alert('Password change failed.');
        }
      );
    }
  }


  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.isSalesOpen = false;
    this.isPurchasesOpen = false;
  }

  isSettingsOpen = false;
  isNotificationsOpen = false;

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'custom-swal-size'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(['/welcomepage']);
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been logged out successfully.',
          icon: 'success',
          customClass: {
            popup: 'custom-swal-size'
          }
        });
      }
    });
  }



  saveProfile(): void {

    this.isEditMode = false;

    const customerId = sessionStorage.getItem('customerId');

    if (!customerId) {
      console.error('Customer ID not found in sessionStorage.');
      return;
    }

    const updatedCustomer = {
      companyName: this.companyName,
      customerEmail: this.companyEmail,
      phoneNumber: this.phoneNumber,
      imagePath: null,
      state: this.state,
      country: this.country
    };

    this.customerService.updateCustomerProfile(customerId, updatedCustomer).subscribe({
      next: () => {
        this.isEditMode = false;
        alert('Profile updated successfully');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile');
      }
    });
  }


}
