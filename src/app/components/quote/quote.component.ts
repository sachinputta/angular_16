import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Quote } from 'src/app/Modals/quote';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnChanges {
 

  @Input() quote: Quote | null = null;


  customerProfile: any = null;
  customerQuotes: Quote[];
  selectedQuoteId: string | null = null;
  selectedQuote: Quote | null = null;
  filteredQuotes: Quote[] = [];

  constructor(private customerService: CustomerService) {}


  ngOnInit(): void {
  

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quote'] && this.quote?.customerId) {
      console.log('Incoming quote:', this.quote);
      this.fetchCustomerProfile(this.quote.customerId);
    }
  }

  fetchCustomerProfile(customerId: string): void {
    this.customerService.getCustomerProfile(customerId).subscribe({
      next: (profile) => {
        // console.log('Customer profile:', profile);
        this.customerProfile = profile;
      },
      error: (err) => {
        console.error('Failed to fetch customer profile:', err);
        this.customerProfile = null; // Fallback to avoid breaking the UI
      }
    });
  }

  getTotalAmount(): number {
    return this.quote?.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  }
  



}
