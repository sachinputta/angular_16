import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { CustomerRegistration } from 'src/app/Modals/CustomerRegistration';


@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.scss']
})
export class AllcustomersComponent implements OnInit  {


  customers: CustomerRegistration[] = [];
  filteredCustomers: CustomerRegistration[] = [];
  paginatedCustomers: CustomerRegistration[] = [];
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 7;
  totalPages: number = 1;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }


  fetchCustomers() {
    this.customerService.getAllRegisteredCustomers().subscribe((data: CustomerRegistration[]) => {
      // Dynamically create customerName by combining firstName and lastName
      this.customers = data.map(customer => ({
        ...customer,
        customerName: `${customer.firstName} ${customer.lastName}`,
      }));
      this.filteredCustomers = [...this.customers];
      this.updatePagination();
    });
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

  viewMore(customer: CustomerRegistration): void {
    console.log('View More:', customer);
    // Optional: Open modal or details page
  }

  updateCustomer(customer: CustomerRegistration): void {
    console.log('Update:', customer);
    // Optional: Open form or modal for update
  }


  deleteCustomer(customer: CustomerRegistration): void {
    if (confirm(`Are you sure you want to delete ${customer.customerName}?`)) {
      this.customerService.deleteCustomer(customer.customerId).subscribe(() => {
        // Remove the deleted customer from the array
        this.customers = this.customers.filter(c => c.customerId !== customer.customerId);

        // Also filter the customers to update the displayed list
        this.filterCustomers();

        // Ensure pagination is updated after deletion
        this.updatePagination();

        // Optional: Check if pagination needs adjustment if current page has no customers left
        if (this.paginatedCustomers.length === 0 && this.currentPage > 1) {
          this.currentPage--; // Move to previous page if the current page is empty
          this.updatePagination();
        }
      });
    }
  }

}

