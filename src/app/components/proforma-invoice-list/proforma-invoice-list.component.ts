import { Component, OnInit } from '@angular/core';
import { ProformaInvoice } from 'src/app/Modals/proforma-invoice';
import { ProformaInvoiceService } from 'src/app/Services/proforma-invoice.service';

@Component({
  selector: 'app-proforma-invoice-list',
  templateUrl: './proforma-invoice-list.component.html',
  styleUrls: ['./proforma-invoice-list.component.scss']
})
export class ProformaInvoiceListComponent implements OnInit {

  invoices: ProformaInvoice[] = [];
  selectedInvoice: ProformaInvoice | null = null;

  constructor(private invoiceService: ProformaInvoiceService) {}

  ngOnInit(): void {
    this.invoices = this.invoiceService.getAllInvoices();
  }

  selectInvoice(invoice: ProformaInvoice) {
    this.selectedInvoice = invoice;
  }
}
