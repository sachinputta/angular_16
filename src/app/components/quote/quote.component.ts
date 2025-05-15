
import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Quote } from 'src/app/Modals/quote';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnChanges {

  @Input() quote: Quote | null = null;
  @ViewChild('quoteContent', { static: false }) quoteContent!: ElementRef;

  customerProfile: any = null;
  customerQuotes: Quote[];
  selectedQuoteId: string | null = null;
  selectedQuote: Quote | null = null;
  filteredQuotes: Quote[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quote'] && this.quote?.customerId) {
      this.fetchCustomerProfile(this.quote.customerId);
    }
  }

  sendQuoteEmail() {
    if (this.quote?.quoteCode) {
      this.customerService.sendQuoteEmail(this.quote.quoteCode).subscribe({
        next: (res) => alert('Email sent successfully!'),
        error: (err) => alert('Failed to send email.')
      });
    }
  }
  

  fetchCustomerProfile(customerId: string): void {
    this.customerService.getCustomerProfile(customerId).subscribe({
      next: (profile) => {
        this.customerProfile = profile;
      },
      error: (err) => {
        console.error('Failed to fetch customer profile:', err);
        this.customerProfile = null;
      }
    });
  }

  getTotalAmount(): number {
    return this.quote?.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  }

  printQuoteAsPDF(): void {
    const element = this.quoteContent.nativeElement;

    const options = {
      margin: 0.5,
      filename: `${this.quote?.quoteCode || 'quote'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
  }

}
