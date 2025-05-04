
import { Component } from '@angular/core';
import { Quote } from 'src/app/Modals/quote';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CustomerService } from 'src/app/customer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allquotes',
  templateUrl: './allquotes.component.html',
  styleUrls: ['./allquotes.component.scss']
})
export class AllquotesComponent {
  quotes: Quote[] = [];
  filteredQuotes: Quote[] = [];
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';
  statuses: string[] = ['DRAFT', 'CLOSED', 'WON', 'LOST', 'SENT'];
  selectedQuoteId: string | null = null;
  selectedQuote: Quote | null = null;

  showModal = false;
  selectedCustomer: any = null;
  customers: any[] = [];

  newQuote = {
    date: '',
    customerId: '',
    customerName: '',
    customerEmail: '',
    items: [{ description: '', quantity: 0, rate: 0, amount: 0 }]
  };

  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const customerId = sessionStorage.getItem('customerId');
    if (customerId) {
      this.getCustomerNamesById(customerId);
      this.newQuote.customerId = customerId;
      this.loadQuotesForCustomer(customerId);
    } else {
      console.warn('No customerId found in sessionStorage');
    }
  }

  loadQuotesForCustomer(customerId: string): void {
    this.customerService.getQuotesByCustomer(customerId).subscribe({
      next: (quotes) => {
        console.log('Quotes received:', quotes);
        this.filteredQuotes = quotes.map(quote => {
          const totalAmount = quote.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
          return { ...quote, amount: totalAmount };
        });
        console.log('Filtered quotes:', this.filteredQuotes);
      },
      error: (err) => {
        console.error('Error fetching quotes:', err);
      }
    });
  }

  openModal() {
    this.showModal = true;
    this.newQuote = {
      date: '',
      customerId: '',
      customerName: '',
      customerEmail: '',
      items: [{ description: '', quantity: 0, rate: 0, amount: 0 }]
    };
  }

  closeModal() {
    this.showModal = false;
  }

  updateItemAmount(index: number) {
    const item = this.newQuote.items[index];
    item.amount = (item.quantity || 0) * (item.rate || 0);
  }

  removeItem(index: number) {
    if (this.newQuote.items.length > 1) {
      this.newQuote.items.splice(index, 1);
    } else {
      alert('At least one item must be present.');
    }
  }

  getCustomerNamesById(customerId: string) {
    this.customerService.getRegistrationsByCustomerId(customerId).subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching customer registration', err);
      }
    });
  }

  onCustomerChange() {
    if (this.selectedCustomer) {
      this.newQuote.customerName = `${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName}`;
      this.newQuote.customerEmail = this.selectedCustomer.customerEmail;
    }
  }

  addItem() {
    this.newQuote.items.push({
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    });
  }

  createQuote() {
    const customerId = sessionStorage.getItem('customerId');
    if (customerId) {
      this.newQuote.customerId = customerId;
      console.log('Creating quote with the following data:', this.newQuote);
      this.customerService.createQuote(this.newQuote).subscribe({
        next: (response) => {
          alert('Quote created successfully!');
          this.loadQuotesForCustomer(customerId);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating quote:', err);
          alert('Failed to create quote');
        }
      });
    } else {
      console.error('Customer ID is not found in local storage');
      alert('Customer ID is missing. Please log in again.');
    }
  }

  selectQuote(quoteCode: string) {
    console.log('selectQuote called with quoteCode:', quoteCode);
    this.selectedQuoteId = quoteCode;
    this.selectedQuote = this.filteredQuotes.find(quote => quote.quoteCode === quoteCode) || null;
    console.log('Selected quote:', this.selectedQuote);
  }

  getTotalAmount(quote: Quote): number {
    return quote.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  }

 
}
