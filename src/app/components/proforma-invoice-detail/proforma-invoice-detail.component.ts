import { Component, Input } from '@angular/core';
import { ProformaInvoice } from 'src/app/Modals/proforma-invoice';

@Component({
  selector: 'app-proforma-invoice-detail',
  templateUrl: './proforma-invoice-detail.component.html',
  styleUrls: ['./proforma-invoice-detail.component.scss']
})
export class ProformaInvoiceDetailComponent {
  @Input() invoice: ProformaInvoice | null = null;

  printInvoice() {
    window.print();
  }
  
  downloadPDF() {
    window.print(); // You can integrate html2pdf.js for true PDF export
  }
  
}
