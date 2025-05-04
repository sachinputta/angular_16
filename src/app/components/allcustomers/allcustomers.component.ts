import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { CustomerRegistration } from 'src/app/Modals/CustomerRegistration';


declare var bootstrap: any;

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.scss']
})


export class AllcustomersComponent implements OnInit {


  customers: CustomerRegistration[] = [];
  filteredCustomers: CustomerRegistration[] = [];
  paginatedCustomers: CustomerRegistration[] = [];
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 7;
  totalPages: number = 1;
  customerDetails: CustomerRegistration[] = [];
 

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchCustomers();

  }

  fetchCustomers(): void {
    const storedCustomerId = sessionStorage.getItem('customerId'); // Get customerId from sessionStorage

    if (storedCustomerId) {
      this.customerService.getRegistrationsByCustomerId(storedCustomerId).subscribe({
        next: (data: CustomerRegistration[]) => {
          // Combine firstName + lastName as customerName
          this.customers = data.map(customer => ({
            ...customer,
            customerName: `${customer.firstName} ${customer.lastName}`,
          }));

          this.filteredCustomers = [...this.customers];
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error fetching customers:', err);
        }
      });
    } else {
      console.error('No customerId found in sessionStorage!');
      alert('Error: No customer ID found. Please log in again.');
    }
  }



  filterCustomers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      (c.firstName + ' ' + c.lastName).toLowerCase().includes(term) ||
      c.customerEmail?.toLowerCase().includes(term) ||
      c.mobileNumber?.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  sort(column: keyof CustomerRegistration): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredCustomers.sort((a, b) => {
      const valueA = a[column] ?? '';
      const valueB = b[column] ?? '';
      return this.sortDirection === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCustomers = this.filteredCustomers.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  // Method to handle the "View More" button click
  viewMore(customer: CustomerRegistration): void {
    this.customerService.viewCustomerRegistration(customer.registrationId).subscribe({
      next: (data) => {
        // If the data is an array, set it directly
        this.customerDetails = [data]; // wrap the single object into an array
        // Show the modal using Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('customerModal')!);
        modal.show();
      },
      error: (err) => {
        console.error('Error fetching customer registrations', err);
      }
    });
  }




  selectedCustomer: any = {};

  // // When clicking the edit icon
  // updateCustomer(customer: CustomerRegistration): void {
  //   // Copy the customer data into selectedCustomer
  //   this.selectedCustomer = { ...customer };

  //   // Open the modal
  //   const modal = new bootstrap.Modal(document.getElementById('updateCustomerModal')!);
  //   modal.show();
  // }


  
  ngAfterViewInit() {
    // Bootstrap tabs initialization after the view has been initialized
    const tabs = new bootstrap.Tab(document.querySelector('.nav-link.active'));
    tabs.show();  // Show the active tab manually
  }

  updateCustomer(customer: CustomerRegistration): void {
    this.selectedCustomer = { ...customer };

    // Open modal
    const modal = new bootstrap.Modal(document.getElementById('updateCustomerModal')!);
    modal.show();

    // Manually initialize tabs after modal is shown
    setTimeout(() => {
      const tabInstance = new bootstrap.Tab(document.querySelector('.nav-link.active'));
      tabInstance.show(); // Show the active tab after modal is shown
    }, 0);
  }

  // When clicking the Save button inside modal
  saveUpdatedCustomer(): void {
    if (!this.selectedCustomer.registrationId) {
      console.error('Registration ID is missing');
      return;
    }

    // Prepare the updatedCustomerDto with all the fields from selectedCustomer
    const updatedCustomerDto: CustomerRegistration = {
      registrationId: this.selectedCustomer.registrationId,
      customerId: this.selectedCustomer.customerId,
      customerType: this.selectedCustomer.customerType || '',
      salutation: this.selectedCustomer.salutation || '',
      firstName: this.selectedCustomer.firstName || '',
      lastName: this.selectedCustomer.lastName || '',
      customerName: this.selectedCustomer.customerName || '',  // Optional field
      companyName: this.selectedCustomer.companyName || '',
      customerEmail: this.selectedCustomer.customerEmail || '',
      phoneNumber: this.selectedCustomer.phoneNumber || '',
      mobileNumber: this.selectedCustomer.mobileNumber || '',

      // Billing Address
      billingStreet: this.selectedCustomer.billingStreet || '',
      billingCity: this.selectedCustomer.billingCity || '',
      billingState: this.selectedCustomer.billingState || '',
      billingCountry: this.selectedCustomer.billingCountry || '',
      billingZip: this.selectedCustomer.billingZip || '',

      // Shipping Address
      shippingStreet: this.selectedCustomer.shippingStreet || '',
      shippingCity: this.selectedCustomer.shippingCity || '',
      shippingState: this.selectedCustomer.shippingState || '',
      shippingCountry: this.selectedCustomer.shippingCountry || '',
      shippingZip: this.selectedCustomer.shippingZip || '',

      // Tax & Compliance
      taxId: this.selectedCustomer.taxId || '',
      pan: this.selectedCustomer.pan || '',
      supplyState: this.selectedCustomer.supplyState || '',
      currency: this.selectedCustomer.currency || '',

      // Payment & Accounting
      paymentTerms: this.selectedCustomer.paymentTerms || '',
      creditLimit: this.selectedCustomer.creditLimit || '',
      bankName: this.selectedCustomer.bankName || '',
      accountNumber: this.selectedCustomer.accountNumber || '',
      ifscCode: this.selectedCustomer.ifscCode || '',
      preferredPaymentMethod: this.selectedCustomer.preferredPaymentMethod || '',

      // Additional Info
      websiteUrl: this.selectedCustomer.websiteUrl || '',
      contactPersonName: this.selectedCustomer.contactPersonName || '',
      contactPersonEmail: this.selectedCustomer.contactPersonEmail || '',
      contactPersonPhone: this.selectedCustomer.contactPersonPhone || '',
      notes: this.selectedCustomer.notes || '',

      // Any other dynamic fields
      ...this.selectedCustomer // Spread any extra fields not directly mapped
    };

    // Call the service method to update the customer
    this.customerService.updateRegisterCustomer(this.selectedCustomer.registrationId, updatedCustomerDto).subscribe({
      next: (data) => {
        console.log('Customer updated successfully', data);
        // Optionally, refresh your customer list here
        this.fetchCustomers();
        // Show success alert
        alert('Customer updated successfully!');
        // Close modal
        const modalElement = document.getElementById('updateCustomerModal')!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
      },
      error: (err) => {
        console.error('Error updating customer', err);
      }
    });
  }




  deleteCustomer(customer: CustomerRegistration): void {
    if (confirm(`Are you sure you want to delete ${customer.customerName}?`)) {
      if (customer.registrationId !== null && customer.registrationId !== undefined) {
        // Ensure the registrationId is a number before passing it to the delete function
        const registrationId = Number(customer.registrationId);

        // Check if the conversion to number was successful
        if (!isNaN(registrationId)) {
          this.customerService.deleteRegisterCustomer(registrationId).subscribe({
            next: () => {
              // Remove the deleted customer from the array
              this.customers = this.customers.filter(c => c.registrationId !== customer.registrationId);

              // Also update the filtered list
              this.filterCustomers();

              // Update pagination
              this.updatePagination();

              // Adjust pagination if needed
              if (this.paginatedCustomers.length === 0 && this.currentPage > 1) {
                this.currentPage--;
                this.updatePagination();
              }

              alert('Customer deleted successfully!');
            },
            error: (err) => {
              console.error('Error deleting customer:', err);
              alert('Error while deleting customer!');
            }
          });
        } else {
          alert('Invalid Registration ID. Cannot delete this customer.');
        }
      } else {
        alert('Registration ID is missing. Cannot delete this customer.');
      }
    }
  }



}

