import { Component } from '@angular/core';
import { Quote } from 'src/app/Modals/quote';
import { QuoteService } from 'src/app/Services/quote.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


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

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quotes = this.quoteService.getQuotes();
    this.filteredQuotes = [...this.quotes];
  }

  filterQuotes(): void {
    this.filteredQuotes = this.quotes.filter(quote => {
      const matchesSearch = quote.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
                           quote.id.toLowerCase().includes(this.searchText.toLowerCase());
      const quoteDate = new Date(quote.date).getTime();
      const start = this.startDate ? new Date(this.startDate).getTime() : -Infinity;
      const end = this.endDate ? new Date(this.endDate).getTime() : Infinity;
      return matchesSearch && quoteDate >= start && quoteDate <= end;
    });
  }

  updateStatus(id: string, status: string): void {
    this.quoteService.updateStatus(id, status as any);
  }

  sendQuote(id: string, mobile: string, email: string): void {
    this.quoteService.sendQuote(id, mobile, email);
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredQuotes);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Quotes');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, 'quotes_' + new Date().toISOString() + '.xlsx');
  }

  selectQuote(id: string): void {
    this.selectedQuoteId = this.selectedQuoteId === id ? null : id;
  }

}
