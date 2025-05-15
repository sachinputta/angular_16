
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Item } from '../itemspage/itemspage.component';
import { CustomerRegistration } from 'src/app/Modals/CustomerRegistration';


declare var bootstrap: any;
@Component({
  selector: 'app-admin-customers-view',
  templateUrl: './admin-customers-view.component.html',
  styleUrls: ['./admin-customers-view.component.scss']
})
export class AdminCustomersViewComponent implements OnInit {

  // @ViewChild('subCustomerModal') subCustomerModal?: ElementRef;
  @ViewChild('subCustomerModal') subCustomerModal!: ElementRef;
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  sortDirection: string = 'none';
  subCustomerMap: { [key: string]: CustomerRegistration[] } = {};
  selectedSubCustomers: CustomerRegistration[] = [];
  customerDetails: CustomerRegistration[] = [];
  isLoading: boolean = true; // Track loading state

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
        this.totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
        this.loadSubCustomers();
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.isLoading = false;
      }
    });
  }

  loadSubCustomers(): void {
    if (!this.customers.length) {
      this.isLoading = false;
      return;
    }
    let loadedCount = 0;
    this.customers.forEach(customer => {
      if (customer.customerId) {
        this.customerService.getRegistrationsByCustomerId(customer.customerId).subscribe({
          next: (subs) => {
            this.subCustomerMap[customer.customerId] = subs || [];
            console.log(`Sub-customers for ${customer.customerId}:`, subs);
            loadedCount++;
            if (loadedCount === this.customers.length) {
              this.isLoading = false;
            }
          },
          error: (err) => {
            console.error(`Error fetching sub-customers for ${customer.customerId}:`, err);
            this.subCustomerMap[customer.customerId] = [];
            loadedCount++;
            if (loadedCount === this.customers.length) {
              this.isLoading = false;
            }
          }
        });
      } else {
        this.subCustomerMap[customer.customerId] = [];
        loadedCount++;
        if (loadedCount === this.customers.length) {
          this.isLoading = false;
        }
      }
    });
  }


  viewSubCustomers(customerId: string): void {
    console.log('viewSubCustomers called with customerId:', customerId);
    this.selectedSubCustomers = this.subCustomerMap[customerId] || [];
    console.log('Selected sub-customers:', this.selectedSubCustomers);
    
    if (this.selectedSubCustomers.length > 0 && this.subCustomerModal) {
      const modalElement = this.subCustomerModal.nativeElement;
  
      // Manually add Bootstrap classes to show the modal
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
    } else {
      console.warn('No sub-customers found or modal element not available for customerId:', customerId);
    }
  }


  closeSubCustomerModal(): void {
    const modalElement = this.subCustomerModal.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
    }
  }



  testClick() {
    console.log('Test button clicked');
  }
  

  getPaginatedCustomers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.companyName?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCustomers = this.customers;
    }
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page on search
  }

  sortByName(): void {
    if (this.sortDirection === 'none' || this.sortDirection === 'desc') {
      this.filteredCustomers.sort((a, b) => a.companyName?.localeCompare(b.companyName) || 0);
      this.sortDirection = 'asc';
    } else {
      this.filteredCustomers.sort((a, b) => b.companyName?.localeCompare(a.companyName) || 0);
      this.sortDirection = 'desc';
    }
  }

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

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  toggleDropdown(): void {
    // Implement dropdown logic if needed
    console.log('Dropdown toggled');
  }
}