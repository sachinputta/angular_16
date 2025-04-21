import { Component } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { CustomerRegistration } from 'src/app/Modals/CustomerRegistration';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  
  constructor(private customerService: CustomerService) {}
  activeTab: string = 'customerDetails'; 

  customer: CustomerRegistration = {
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


  submitForm() {
    this.customer.customerId = this.customer.customerEmail; // ID same as email

    this.customerService.newCustomerRegister(this.customer).subscribe({
      next: (res) => alert('Customer registered successfully!'),
      error: (err) => console.error(err)
    });
  }
  
  copyBillingToShipping(event: any) {
    if (event.target.checked) {
      this.shipping = { ...this.billing };
    } else {
      this.shipping = {
        street: '',
        city: '',
        state: '',
        country: '',
        zip: ''
      };
    }
  }
  
  isBillingComplete(): boolean {
    return this.billing.street !== "" && this.billing.city !== "" && this.billing.state !== "" && this.billing.country !== "" && this.billing.zip !== "";
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

}
