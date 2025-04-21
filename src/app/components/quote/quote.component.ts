import { Component, Input, OnChanges } from '@angular/core';
import { Quote } from 'src/app/Modals/quote';
import { QuoteService } from 'src/app/Services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnChanges {
  @Input() selectedQuoteId: string | null = null;
  quote: Quote | undefined;

  constructor(private quoteService: QuoteService) {}

  ngOnChanges(): void {
    if (this.selectedQuoteId) {
      this.quote = this.quoteService.getQuote(this.selectedQuoteId);
    } else {
      this.quote = undefined;
    }
  }

  markAsSent(): void {
    if (this.quote) this.quoteService.updateStatus(this.quote.id, 'SENT');
  }
}
