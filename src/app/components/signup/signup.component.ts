import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
declare var bootstrap: any; // Import bootstrap to Angular scope if needed
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  customer = {
    companyName: '',
    customerId: '',
    customerPassword: '',
    phoneNumber: '',
    countryCode: '+91',
    country: 'India',
    state: '',
    agreeToTerms: false,
  customerEmail: ''
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    const termsModalEl = document.getElementById('termsModal');
    if (termsModalEl) {
      new bootstrap.Modal(termsModalEl); // Attach manually if needed
    }
  }
  

  // onSignup(): void {
  //   if (!this.customer.agreeToTerms) {
  //     alert('Please agree to terms and conditions.');
  //     return;
  //   }

  //   this.customerService.registerCustomer(this.customer).subscribe({
  //     next: () => {
  //       alert('Account created successfully!');
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //       alert('Signup failed. Please try again.');
  //     }
  //   });
  // }

  onSignup(): void {
    if (!this.customer.agreeToTerms) {
      alert('Please agree to terms and conditions.');
      return;
    }
  
    const customerData = {
      ...this.customer,
      customerEmail: this.customer.customerId
    };
  
  
    this.customerService.registerCustomer(customerData).subscribe({
      next: (res) => {
        console.log('Response:', res);
        alert('Account created successfully!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Error during signup:', err);
        alert('Signup failed. Please try again.');
      }
    });
  }
  
  onlyNumberKey(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
  
}
