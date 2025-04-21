import { Injectable } from '@angular/core';
import { Quote } from '../Modals/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor() { }
  private quotes: Quote[] = [
    {
      id: 'QT-000002',
      customerName: 'Mr. Rajinikanth Ch',
      date: '17/03/2025',
      amount: 8000,
      status: 'DRAFT',
      shipTo: 'HYDERABAD',
      items: [
        {
          description: 'Complete Dynamic Website With Modern Framework...',
          quantity: 1,
          rate: 8000,
          amount: 8000
        }
      ]
    },
    {
      id: 'QT-000001',
      customerName: 'Guiding Consulting',
      date: '06/03/2025',
      amount: 9990,
      status: 'DRAFT',
      shipTo: 'HYDERABAD',
      items: [
        {
          description: 'Consulting Services',
          quantity: 1,
          rate: 9990,
          amount: 9990
        }
      ]
    }
  ];

  getQuotes(): Quote[] {
    return this.quotes;
  }

  getQuote(id: string): Quote | undefined {
    return this.quotes.find(q => q.id === id);
  }

  updateStatus(id: string, status: 'DRAFT' | 'CLOSED' | 'WON' | 'LOST' | 'SENT'): void {
    const quote = this.quotes.find(q => q.id === id);
    if (quote) quote.status = status;
  }

  sendQuote(id: string, mobile: string, email: string): void {
    const quote = this.getQuote(id);
    if (quote) {
      console.log(`Sending quote ${id} to ${mobile} and ${email}`);
      this.updateStatus(id, 'SENT');
    }
  }
}
