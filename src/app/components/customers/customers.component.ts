import { Component } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { CustomerRegistration } from 'src/app/Modals/CustomerRegistration';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  constructor(private customerService: CustomerService) { }

  activeTab: string = 'customerDetails';

  customer: CustomerRegistration = this.initializeCustomer();

  billing = {
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  };

  shipping = {
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  };

  // Initialize customer object
  initializeCustomer(): CustomerRegistration {
    return {
      registrationId: 0,  
      customerId: '',
      customerType: 'Business',
      salutation: '',
      firstName: '',
      lastName: '',
      companyName: '',
      customerEmail: '',
      phoneNumber: '',
      mobileNumber: '',
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingCountry: '',
      billingZip: '',
      shippingStreet: '',
      shippingCity: '',
      shippingState: '',
      shippingCountry: '',
      shippingZip: '',
      taxId: '',
      pan: '',
      supplyState: '',
      currency: '',
      paymentTerms: '',
      creditLimit: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      preferredPaymentMethod: '',
      websiteUrl: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactPersonPhone: '',
      notes: ''
    };
  }

  // Submit customer registration form
  submitForm() {
    const storedCustomerId = sessionStorage.getItem('customerId'); // Get customerId from sessionStorage

    if (storedCustomerId) {
      this.customer.customerId = storedCustomerId; // Set it into customer object

      this.customerService.customerRegistration(this.customer).subscribe({
        next: (res) => alert('Customer registered successfully!'),
        error: (err) => console.error('Registration error:', err)
      });
    } else {
      console.error('No customerId found in sessionStorage!');
      alert('Error: No customer ID found. Please log in again.');
    }
  }



  tabOrder: string[] = ['customerDetails', 'address', 'taxCompliance', 'paymentAccounting', 'additionalInfo'];

  goNext() {
    const currentIndex = this.tabOrder.indexOf(this.activeTab);
    if (currentIndex < this.tabOrder.length - 1) {
      this.activeTab = this.tabOrder[currentIndex + 1];
    }
  }

  goBack() {
    const currentIndex = this.tabOrder.indexOf(this.activeTab);
    if (currentIndex > 0) {
      this.activeTab = this.tabOrder[currentIndex - 1];
    }
  }


  
  copyBillingToShipping(event: any) {
    if (event.target.checked && this.isBillingComplete()) {
      this.customer.shippingStreet = this.customer.billingStreet;
      this.customer.shippingCity = this.customer.billingCity;
      this.customer.shippingState = this.customer.billingState;
      this.customer.shippingCountry = this.customer.billingCountry;
      this.customer.shippingZip = this.customer.billingZip;
    } else {
      this.customer.shippingStreet = '';
      this.customer.shippingCity = '';
      this.customer.shippingState = '';
      this.customer.shippingCountry = '';
      this.customer.shippingZip = '';
    }
  }
  
  isBillingComplete(): boolean {
    return !!(
      this.customer.billingStreet &&
      this.customer.billingCity &&
      this.customer.billingState &&
      this.customer.billingCountry &&
      this.customer.billingZip
    );
  }

  allowOnlyDigits(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  


}
