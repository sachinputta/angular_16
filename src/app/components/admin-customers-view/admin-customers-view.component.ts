import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Item } from '../itemspage/itemspage.component';

@Component({
  selector: 'app-admin-customers-view',
  templateUrl: './admin-customers-view.component.html',
  styleUrls: ['./admin-customers-view.component.scss']
})
export class AdminCustomersViewComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;  // Number of customers per page
  totalPages: number = 1;
  sortDirection: string = 'none';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    // Fetch customers when the component initializes
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.filteredCustomers = data;
      this.totalPages = Math.ceil(this.customers.length / this.itemsPerPage);
    });
  }

  // Get customers for the current page
  getPaginatedCustomers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Handle search
  onSearch(): void {
    if (this.searchQuery) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCustomers = this.customers;
    }
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  }

  // Sort by name
  sortByName(): void {
    if (this.sortDirection === 'none' || this.sortDirection === 'desc') {
      this.filteredCustomers.sort((a, b) => a.companyName.localeCompare(b.companyName));
      this.sortDirection = 'asc';
    } else {
      this.filteredCustomers.sort((a, b) => b.companyName.localeCompare(a.companyName));
      this.sortDirection = 'desc';
    }
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Get page numbers for pagination
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  toggleDropdown(): void {
    // Optional: implement dropdown logic
  }
  
}
